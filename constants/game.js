export const gameContractAddress = "0xDd84D48661Db3EEBbA401Af00ac196A1517e3B2D";
export const gameABI = [{
        inputs: [{ internalType: "address", name: "_token", type: "address" }],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    { inputs: [], name: "MaximumPlayersLimitReached", type: "error" },
    { inputs: [], name: "NoAmountStakedInGame", type: "error" },
    { anonymous: false, inputs: [], name: "GameDrawn", type: "event" },
    {
        anonymous: false,
        inputs: [{
            indexed: false,
            internalType: "address",
            name: "winnersAddress",
            type: "address",
        }, ],
        name: "GameEnded",
        type: "event",
    },
    { anonymous: false, inputs: [], name: "GameExpired", type: "event" },
    { anonymous: false, inputs: [], name: "GameNotExpired", type: "event" },
    {
        anonymous: false,
        inputs: [{
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "EXPIRATIONTIME",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{
                internalType: "address payable",
                name: "winnersAddress",
                type: "address",
            },
            { internalType: "string", name: "_movesHash", type: "string" },
        ],
        name: "endGame",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "player1", type: "address" },
            { internalType: "address", name: "player2", type: "address" },
            { internalType: "uint256", name: "player1Fee", type: "uint256" },
            { internalType: "uint256", name: "player2Fee", type: "uint256" },
        ],
        name: "enterGame",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "expireGame",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "game_state",
        outputs: [
            { internalType: "enum GameContract.GAME_STATE", name: "", type: "uint8" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "playerAddress", type: "address" },
        ],
        name: "getPlayerToAmountStaked",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "getWneoBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "movesHash",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "palyersInAMatch",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "playerToAmountStaked",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "players",
        outputs: [{ internalType: "address payable", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "recentWinner",
        outputs: [{ internalType: "address payable", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "startGame",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "startingTimeStamp",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];