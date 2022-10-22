const gameABI = [{
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
    {
        inputs: [],
        name: "winner",
        outputs: [{ internalType: "address payable", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
];

const gameByteCode =
    "60a06040523480156200001157600080fd5b5060405162002418380380620024188339818101604052810190620000379190620001ca565b620000576200004b620000e760201b60201c565b620000ef60201b60201c565b6001600660006101000a81548160ff02191690836002811115620000a4577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055508073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250505062000244565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050620001c4816200022a565b92915050565b600060208284031215620001dd57600080fd5b6000620001ed84828501620001b3565b91505092915050565b600062000203826200020a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200023581620001f6565b81146200024157600080fd5b50565b60805160601c61217d6200029b600039600081816103fa015281816106b10152818161076101528181610b0001528181610c8901528181610cc60152818161113c0152818161126d0152611424015261217d6000f3fe608060405234801561001057600080fd5b506004361061010a5760003560e01c80638ae43b54116100a2578063dfbf53ae11610071578063dfbf53ae1461026f578063e435e3701461028d578063e90ce78c14610297578063f2fde38b146102c7578063f71d96cb146102e35761010a565b80638ae43b541461020d5780638da5cb5b1461022b578063d65ab5f214610249578063dfa987a2146102535761010a565b806368f97d6c116100de57806368f97d6c14610199578063715018a6146101c95780638766e9c0146101d357806387ccd408146101ef5761010a565b80624d4d2c1461010f5780630cc010961461012d57806326b484271461015d578063509a0ca51461017b575b600080fd5b610117610313565b6040516101249190611c31565b60405180910390f35b610147600480360381019061014291906117d2565b610319565b6040516101549190611c31565b60405180910390f35b610165610362565b6040516101729190611c31565b60405180910390f35b610183610368565b6040516101909190611b4f565b60405180910390f35b6101b360048036038101906101ae91906117d2565b6103f6565b6040516101c09190611c31565b60405180910390f35b6101d16104a8565b005b6101ed60048036038101906101e8919061184f565b6104bc565b005b6101f7610987565b6040516102049190611c31565b60405180910390f35b610215610994565b6040516102229190611b34565b60405180910390f35b6102336109a7565b6040516102409190611a83565b60405180910390f35b6102516109d0565b005b61026d600480360381019061026891906117fb565b610af4565b005b610277610e69565b6040516102849190611ab9565b60405180910390f35b610295610e8f565b005b6102b160048036038101906102ac91906117d2565b610f1b565b6040516102be9190611c31565b60405180910390f35b6102e160048036038101906102dc91906117d2565b610f33565b005b6102fd60048036038101906102f891906118db565b610fb7565b60405161030a9190611ab9565b60405180910390f35b60045481565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61012c81565b6003805461037590611e3f565b80601f01602080910402602001604051908101604052809291908181526020018280546103a190611e3f565b80156103ee5780601f106103c3576101008083540402835291602001916103ee565b820191906000526020600020905b8154815290600101906020018083116103d157829003601f168201915b505050505081565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b81526004016104519190611a83565b60206040518083038186803b15801561046957600080fd5b505afa15801561047d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a19190611904565b9050919050565b6104b0610ff6565b6104ba6000611074565b565b6104c4610ff6565b60026104ce610987565b1415610557576001600660006101000a81548160ff02191690836002811115610520577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506040517fefe260b200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006002811115610591577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600660009054906101000a900460ff1660028111156105d9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610619576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061090611bb1565b60405180910390fd5b81610623856103f6565b1015610664576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065b90611bf1565b60405180910390fd5b8061066e846103f6565b10156106af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a690611b91565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd8530856040518463ffffffff1660e01b815260040161070c93929190611afd565b602060405180830381600087803b15801561072657600080fd5b505af115801561073a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075e91906118b2565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd8430846040518463ffffffff1660e01b81526004016107bc93929190611afd565b602060405180830381600087803b1580156107d657600080fd5b505af11580156107ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080e91906118b2565b506001849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109249190611cbe565b9250508190555080600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461097a9190611cbe565b9250508190555050505050565b6000600180549050905090565b600660009054906101000a900460ff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6109d8610ff6565b60016002811115610a12577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600660009054906101000a900460ff166002811115610a5a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610a9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a9190611c11565b60405180910390fd5b6000600660006101000a81548160ff02191690836002811115610ae6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555042600481905550565b610afc610ff6565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610b579190611a83565b60206040518083038186803b158015610b6f57600080fd5b505afa158015610b83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba79190611904565b11610bde576040517f0e29e08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600660006101000a81548160ff02191690836002811115610c2a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060039080519060200190610c8692919061165e565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb837f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610d1d9190611a83565b60206040518083038186803b158015610d3557600080fd5b505afa158015610d49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d6d9190611904565b6040518363ffffffff1660e01b8152600401610d8a929190611ad4565b602060405180830381600087803b158015610da457600080fd5b505af1158015610db8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ddc91906118b2565b506001600660006101000a81548160ff02191690836002811115610e29577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055507f51b77d00d3c0b7e376e9ee146711ceb2c08e58a5dbe38055a618e52109f720c182604051610e5d9190611a9e565b60405180910390a15050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610e97610ff6565b600042905061012c60045482610ead9190611d14565b10610eeb57610eba611138565b7fdcff8fcc85788a72cb2b6c7dd0e7a1e4522d22d2119dcd3691b293115c03572d60405160405180910390a1610f18565b7ffc454c72f2d88046b62aa5966ab0bf96f49557f436565c75d3693f7a2898282760405160405180910390a15b50565b60056020528060005260406000206000915090505481565b610f3b610ff6565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610fab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fa290611b71565b60405180910390fd5b610fb481611074565b50565b60018181548110610fc757600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610ffe611656565b73ffffffffffffffffffffffffffffffffffffffff1661101c6109a7565b73ffffffffffffffffffffffffffffffffffffffff1614611072576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106990611bd1565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016111939190611a83565b60206040518083038186803b1580156111ab57600080fd5b505afa1580156111bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e39190611904565b1161121a576040517f0e29e08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600660006101000a81548160ff02191690836002811115611266577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60016000815481106112e2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660056000600160008154811061134c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518363ffffffff1660e01b81526004016113cf929190611ad4565b602060405180830381600087803b1580156113e957600080fd5b505af11580156113fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061142191906118b2565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb60018081548110611498577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005600060018081548110611501577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518363ffffffff1660e01b8152600401611584929190611ad4565b602060405180830381600087803b15801561159e57600080fd5b505af11580156115b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115d691906118b2565b506001600660006101000a81548160ff02191690836002811115611623577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055507f1f2b5dbbae08a36eba606ff3cbe5cc367d770ad11bce3a2e1c60573d7fd37f5260405160405180910390a1565b600033905090565b82805461166a90611e3f565b90600052602060002090601f01602090048101928261168c57600085556116d3565b82601f106116a557805160ff19168380011785556116d3565b828001600101855582156116d3579182015b828111156116d25782518255916020019190600101906116b7565b5b5090506116e091906116e4565b5090565b5b808211156116fd5760008160009055506001016116e5565b5090565b600061171461170f84611c71565b611c4c565b90508281526020810184848401111561172c57600080fd5b611737848285611dfd565b509392505050565b60008135905061174e816120eb565b92915050565b60008135905061176381612102565b92915050565b60008151905061177881612119565b92915050565b600082601f83011261178f57600080fd5b813561179f848260208601611701565b91505092915050565b6000813590506117b781612130565b92915050565b6000815190506117cc81612130565b92915050565b6000602082840312156117e457600080fd5b60006117f28482850161173f565b91505092915050565b6000806040838503121561180e57600080fd5b600061181c85828601611754565b925050602083013567ffffffffffffffff81111561183957600080fd5b6118458582860161177e565b9150509250929050565b6000806000806080858703121561186557600080fd5b60006118738782880161173f565b94505060206118848782880161173f565b9350506040611895878288016117a8565b92505060606118a6878288016117a8565b91505092959194509250565b6000602082840312156118c457600080fd5b60006118d284828501611769565b91505092915050565b6000602082840312156118ed57600080fd5b60006118fb848285016117a8565b91505092915050565b60006020828403121561191657600080fd5b6000611924848285016117bd565b91505092915050565b61193681611db5565b82525050565b61194581611d5a565b82525050565b61195481611d48565b82525050565b61196381611dc7565b82525050565b600061197482611ca2565b61197e8185611cad565b935061198e818560208601611e0c565b61199781611f5e565b840191505092915050565b60006119af602683611cad565b91506119ba82611f6f565b604082019050919050565b60006119d2602383611cad565b91506119dd82611fbe565b604082019050919050565b60006119f5601c83611cad565b9150611a008261200d565b602082019050919050565b6000611a18602083611cad565b9150611a2382612036565b602082019050919050565b6000611a3b602383611cad565b9150611a468261205f565b604082019050919050565b6000611a5e601b83611cad565b9150611a69826120ae565b602082019050919050565b611a7d81611dab565b82525050565b6000602082019050611a98600083018461194b565b92915050565b6000602082019050611ab3600083018461192d565b92915050565b6000602082019050611ace600083018461193c565b92915050565b6000604082019050611ae9600083018561192d565b611af66020830184611a74565b9392505050565b6000606082019050611b12600083018661194b565b611b1f602083018561194b565b611b2c6040830184611a74565b949350505050565b6000602082019050611b49600083018461195a565b92915050565b60006020820190508181036000830152611b698184611969565b905092915050565b60006020820190508181036000830152611b8a816119a2565b9050919050565b60006020820190508181036000830152611baa816119c5565b9050919050565b60006020820190508181036000830152611bca816119e8565b9050919050565b60006020820190508181036000830152611bea81611a0b565b9050919050565b60006020820190508181036000830152611c0a81611a2e565b9050919050565b60006020820190508181036000830152611c2a81611a51565b9050919050565b6000602082019050611c466000830184611a74565b92915050565b6000611c56611c67565b9050611c628282611e71565b919050565b6000604051905090565b600067ffffffffffffffff821115611c8c57611c8b611f2f565b5b611c9582611f5e565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000611cc982611dab565b9150611cd483611dab565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611d0957611d08611ea2565b5b828201905092915050565b6000611d1f82611dab565b9150611d2a83611dab565b925082821015611d3d57611d3c611ea2565b5b828203905092915050565b6000611d5382611d8b565b9050919050565b6000611d6582611d8b565b9050919050565b60008115159050919050565b6000819050611d86826120d7565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000611dc082611dd9565b9050919050565b6000611dd282611d78565b9050919050565b6000611de482611deb565b9050919050565b6000611df682611d8b565b9050919050565b82818337600083830152505050565b60005b83811015611e2a578082015181840152602081019050611e0f565b83811115611e39576000848401525b50505050565b60006002820490506001821680611e5757607f821691505b60208210811415611e6b57611e6a611f00565b5b50919050565b611e7a82611f5e565b810181811067ffffffffffffffff82111715611e9957611e98611f2f565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f75676820574e454f20696e20706c6179657232206163636f7560008201527f6e74210000000000000000000000000000000000000000000000000000000000602082015250565b7f5468657265277320616e206f6e676f696e672067616d65206e6f772100000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4e6f7420656e6f75676820574e454f20696e20706c6179657231206163636f7560008201527f6e74210000000000000000000000000000000000000000000000000000000000602082015250565b7f43616e27742073746172742061206e65772067616d6520796574210000000000600082015250565b600381106120e8576120e7611ed1565b5b50565b6120f481611d48565b81146120ff57600080fd5b50565b61210b81611d5a565b811461211657600080fd5b50565b61212281611d6c565b811461212d57600080fd5b50565b61213981611dab565b811461214457600080fd5b5056fea2646970667358221220cc6bb07118478c56e2258ba2696259fd42a87ebd0335624b1c941c01b173648464736f6c634300080400330000000000000000000000004ff26f491f07bb9e562e7ac404ca54c93b5a31d2";