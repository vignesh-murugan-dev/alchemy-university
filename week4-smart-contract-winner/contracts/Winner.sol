// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface Contract {
    function attempt() external;
}

contract Winner {
    address public owner;
    constructor(){
        owner = msg.sender;
    }
    function jackpot() external{
        Contract.attempt();
    }
}