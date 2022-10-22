// const { google } = require("googleapis");

// const CLIENT_ID =
//     "997480953608-upfe9ggda44hrnve0n6to02a5dtc8vti.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URL = "https://developers.google.com/oauthplayground/";

// const REFRESH_TOKEN =
//     "1//04ujJrAtb04v0CgYIARAAGAQSNwF-L9IrYof6zJkf5VXtC_FeXUtnCYBTOVE_g9A5XLYrC_vYHNC_HUDJh7vaGLYKn-IrRD2HpSU";

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URL
// );

// const drive = google.drive({
//     version: "v3",
//     auth: oauth2Client,
// });

// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

Moralis.Cloud.define("storeImageOnDrive", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        // const imageBuffer = request.params.imageBuffer;
        const imageURI = request.params.imageURI;
        logger.info(imageURI);
    } catch (e) {
        logger.error(e);
    }
});

// Gives out recently finished games of the player(top 10), game data of the player(win/loss), assets owned by the player.
Moralis.Cloud.define("getPlayerGameDetails", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const uName = request.params.uName;
            const playerFinishedGames = await getFinishedGames(uName);
            const playerGameData = await getGameData(uName);
            const playerAssets = await getAssets(uName);
            const result = {
                playerFinishedGames: playerFinishedGames,
                playerGameData: playerGameData,
                playerAssets: playerAssets,
            };
            return result;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

// Gets all the games that are in running state now.
Moralis.Cloud.define("getRunningGames", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const allRunningGames = await getRunningGamesFromDB();
        const allFinishedGames = await getFinishedGamesFromDB();
        const result = {
            allRunningGames: allRunningGames,
            allFinishedGames: allFinishedGames,
        };
        return result;
    } catch (e) {
        logger.error(e);
    }
});

//Returns the WNEO & NEO balances of a players address
Moralis.Cloud.define("getBalance", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const accountAddress = request.params.accountAddress;
            const eth = Moralis.ethersByChain("0x13881");
            const wallet = getCreds(eth);
            const WneoContract = getWneoContract(eth, WneoAddress, WneoABI, wallet);
            const NeoContract = getWneoContract(eth, NeoAddress, NeoABI, wallet);
            const WneoBalance = await WneoContract.balanceOf(accountAddress);
            const NeoBalance = await NeoContract.balanceOf(accountAddress);
            const result = {
                WneoBalance: eth.ethers.utils.formatEther(WneoBalance).toString(),
                NeoBalance: eth.ethers.utils.formatEther(NeoBalance).toString(),
            };
            return result;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

// Deploys a game contract, whitelists it to wneo and starts the game.
Moralis.Cloud.define("deployGameContract", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const eth = Moralis.ethersByChain("0x13881");
            const wallet = getCreds(eth);
            const WneoContract = getWneoContract(eth, WneoAddress, WneoABI, wallet);
            const factory = new eth.ethers.ContractFactory(
                gameABI,
                gameByteCode,
                wallet
            );
            const gameContract = await factory.deploy(WneoAddress);
            const gameContractApprovalTxn = await WneoContract.approveGameContract(
                gameContract.address
            );
            await gameContractApprovalTxn.wait(1);
            const gameStartedTx = await gameContract.startGame();
            await gameStartedTx.wait(1);
            const result = {
                gameContract: gameContract.address,
                gameContractApprovalTxn: gameContractApprovalTxn,
                gameStartedTx: gameStartedTx,
            };
            return result;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

// Pushes the player into the game locks their waged amounts into the contract.
Moralis.Cloud.define("enterGame", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const player1Fee = request.params.p1Fee;
            const player2Fee = request.params.p2Fee;
            const player1 = request.params.p1;
            const player2 = request.params.p2;
            const gameContractAddress = request.params.gameContractAddress;

            const eth = Moralis.ethersByChain("0x13881");
            const wallet = getCreds(eth);

            const gameContract = new eth.ethers.Contract(
                gameContractAddress,
                gameABI,
                wallet
            );

            // await updateChessGameData(gameContractAddress, player1Name, player2Name);

            const gameEnteredTx = await gameContract.enterGame(
                player1,
                player2,
                player1Fee,
                player2Fee
            );

            return gameEnteredTx;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

// Ends the game and concludes the winner.
Moralis.Cloud.define("endGame", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const winnerAddress = request.params.winnerAddress;
            const movesHash = request.params.movesHash;
            const gameContractAddress = request.params.gameContractAddress;

            const eth = Moralis.ethersByChain("0x13881");
            const wallet = getCreds(eth);

            const gameContract = new eth.ethers.Contract(
                gameContractAddress,
                gameABI,
                wallet
            );

            const winnerDeclaredTx = await gameContract.endGame(
                winnerAddress,
                movesHash
            );

            return winnerDeclaredTx;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

// If game has reached expiration duration, it can be used to expire the particular game contract, and return the amount to the players.
Moralis.Cloud.define("expireGame", async(request) => {
    const logger = Moralis.Cloud.getLogger();
    try {
        const authToken = request.headers.auth;
        const user = await authenticateUser(authToken);
        if (user) {
            const gameContractAddress = request.params.gameContractAddress;

            const eth = Moralis.ethersByChain("0x13881");
            const wallet = getCreds(eth);

            const gameContract = new eth.ethers.Contract(
                gameContractAddress,
                gameABI,
                wallet
            );

            const expiredTx = await gameContract.expireGame();

            return expiredTx;
        } else {
            const result = {
                result: "Unauthorized! Please authenticate using a valid user.",
            };
            return result;
        }
    } catch (e) {
        logger.error(e);
    }
});

Moralis.Cloud.define("fetchNft", async(request) => {
    const id = request.params.id;
    const fetchedNft = await getFetchedNft(id);
    return fetchedNft;
});

// -----------------------------------------NFT-MARKETPLACE---------------------------------------------------

Moralis.Cloud.afterSave("ItemListed", async(request) => {
    const confirmed = request.object.get("confirmed");
    const logger = Moralis.Cloud.getLogger();
    logger.info("Looking for confirmed TX...");
    if (confirmed) {
        logger.info("Found item!");
        const ActiveItem = Moralis.Object.extend("ActiveItem");

        // In case of listing update, search for already listed ActiveItem and delete
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        query.equalTo("address", request.object.get("address"));
        query.equalTo("seller", request.object.get("seller"));
        logger.info(`Marketplace | Query: ${query}`);
        const alreadyListedItem = await query.first();
        if (alreadyListedItem) {
            logger.info(`Deleting ${request.object.get("objectId")}`);
            await alreadyListedItem.destroy();
            logger.info(
                `Deleted item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get(
          "address"
        )} since the listing is being updated. `
            );
        }

        // Add new ActiveItem
        const activeItem = new ActiveItem();
        activeItem.set("address", request.object.get("address"));
        activeItem.set("nftAddress", request.object.get("nftAddress"));
        activeItem.set("price", request.object.get("price"));
        activeItem.set("tokenId", request.object.get("tokenId"));
        activeItem.set("seller", request.object.get("seller"));
        logger.info(
            `Adding Address: ${request.object.get(
        "address"
      )} TokenId: ${request.object.get("tokenId")}`
        );
        logger.info("Saving...");
        await activeItem.save();
    }
});

Moralis.Cloud.afterSave("ItemCanceled", async(request) => {
    const confirmed = request.object.get("confirmed");
    logger.info(`Marketplace | Object: ${request.object}`);
    if (confirmed) {
        const logger = Moralis.Cloud.getLogger();
        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("address", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`Marketplace | Query: ${query}`);
        const canceledItem = await query.first();
        logger.info(`Marketplace | CanceledItem: ${canceledItem}`);
        if (canceledItem) {
            logger.info(`Deleting ${request.object.get("objectId")}`);
            await canceledItem.destroy();
            logger.info(
                `Deleted item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")} since it was canceled. `
            );
        } else {
            logger.info(
                `No item canceled with address: ${request.object.get(
          "address"
        )} and tokenId: ${request.object.get("tokenId")} found.`
            );
        }
    }
});

Moralis.Cloud.afterSave("ItemBought", async(request) => {
    const confirmed = request.object.get("confirmed");
    logger.info(`Marketplace | Object: ${request.object}`);
    if (confirmed) {
        const logger = Moralis.Cloud.getLogger();
        const ActiveItem = Moralis.Object.extend("ActiveItem");
        const query = new Moralis.Query(ActiveItem);
        query.equalTo("address", request.object.get("address"));
        query.equalTo("nftAddress", request.object.get("nftAddress"));
        query.equalTo("tokenId", request.object.get("tokenId"));
        logger.info(`Marketplace | Query: ${query}`);
        const canceledItem = await query.first();
        logger.info(`Marketplace | CanceledItem: ${canceledItem}`);
        if (canceledItem) {
            logger.info(`Deleting ${request.object.get("objectId")}`);
            await canceledItem.destroy();
            logger.info(
                `Deleted item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get(
          "address"
        )} from ActiveItem table since it was bought.`
            );
        } else {
            logger.info(
                `No item bought with address: ${request.object.get(
          "address"
        )} and tokenId: ${request.object.get("tokenId")} found`
            );
        }
    }
});