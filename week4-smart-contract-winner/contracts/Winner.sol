//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// interface of the Alchemy's Contract
interface Contract {
    function attempt() external;
}

contract Winner {
    address contractAddress; // variable storing Alchemy's Contract address to call

    // initializing my contract with the Alchemy's Contract address
    constructor(address _contractAddress){
        contractAddress = _contractAddress;
    }

    // calling the attempt() of Alchemy's Contract from my Winner contract
    function callWinner() external{
        return Contract(contractAddress).attempt();
    }
}