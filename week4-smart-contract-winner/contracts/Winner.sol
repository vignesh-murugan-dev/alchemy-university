//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Contract {
    function attempt() external;
}

contract Winner {
    address contractAddress;

    constructor(address _contractAddress){
        contractAddress = _contractAddress;
    }
    function callWinner() external{
        return Contract(contractAddress).attempt();
    }
}