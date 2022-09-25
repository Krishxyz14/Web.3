solc = require("solc");

fs = require("fs");

Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));


let fileContent = fs.readFileSync("demo.sol").toString();

console.log(fileContent);

var input = {
    language: "solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
ABI = output.contracts["demo.sol"]["demo"].abi;
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
console.log("abi:",ABI);
console.log("bytecode:",bytecode);

contract = new web3.eth.Contract(ABI);
web3.eth.getAccounts().then((accounts)=>{
    console.log("Accounts:",accounts);
});
