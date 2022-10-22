function getCreds(eth) {
    const ethersProvider = new eth.ethers.providers.JsonRpcProvider(
        "https://nd-632-987-999.p2pify.com/1338439f63f1c01a30bd1f7590b2d49e"
    );
    const wallet = new eth.ethers.Wallet(
        "8562f1609022f124780380164b6e3b9d5542e3f805464cc77dc638252ea1a169",
        ethersProvider
    );

    return wallet;
}

function getWneoContract(eth, WneoAddress, WneoABI, wallet) {
    const WneoContract = new eth.ethers.Contract(WneoAddress, WneoABI, wallet);
    return WneoContract;
}

function getNeoContract(eth, NeoAddress, NeoABI, wallet) {
    const NeoContract = new eth.ethers.Contract(NeoAddress, NeoABI, wallet);
    return NeoContract;
}

async function updateChessGameData(contractAddress, player1Name, player2Name) {
    const ChessGameData = Moralis.Object.extend("ChessGameData");
    const chessGame = new ChessGameData();
    chessGame.set("player1Name", player1Name);
    chessGame.set("player2Name", player2Name);
    chessGame.set("contractAddress", contractAddress);
    chessGame.set("gameState", "Running");
    chessGame.set("wager", 1000);
    chessGame.set("result", "Waiting For Result");

    chessGame.save();
}

async function authenticateUser(_sessionToken) {
    const Session = Moralis.Object.extend("_Session");
    const query = new Moralis.Query(Session);
    query.equalTo("sessionToken", _sessionToken);
    const res = await query.first({ useMasterKey: true });
    return res;
}

async function getRunningGamesFromDB() {
    const GameContracts = Moralis.Object.extend("ChessGameData");
    const query = new Moralis.Query(GameContracts);
    query.equalTo("gameState", "Running");
    let res = await query.find({ useMasterKey: true });
    return res;
}

async function getFinishedGamesFromDB() {
    const GameContracts = Moralis.Object.extend("ChessGameData");
    const query = new Moralis.Query(GameContracts);
    query.equalTo("gameState", "Finished");
    let res = await query.find({ useMasterKey: true });
    return res;
}

async function getGameData(userName) {
    const UserGameData = Moralis.Object.extend("UserGameData");
    const query = new Moralis.Query(UserGameData);
    query.equalTo("username", userName);
    const res = await query.first({ useMasterKey: true });
    return res;
}

async function getAssets(userName) {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    query.equalTo("username", userName);
    const res = await query.first({ useMasterKey: true });
    return res.attributes.assets;
}

async function getFinishedGames(userName) {
    const GameContracts = Moralis.Object.extend("ChessGameData");
    const query = new Moralis.Query(GameContracts);
    query.equalTo("gameState", "Finished");
    const res = await query.find({ useMasterKey: true });
    let results = [];
    for (let i = 0; i < res.length; i++) {
        if (
            res[i].attributes.player1Name == userName ||
            res[i].attributes.player2Name == userName
        ) {
            results.push(res[i]);
        }
    }
    return results;
}

async function getFetchedNft(id) {
    const ActiveItem = Moralis.Object.extend("ActiveItem");
    const query = new Moralis.Query(ActiveItem);
    query.equalTo("objectId", id);
    const res = await query.first({ useMasterKey: true });
    return res;
}