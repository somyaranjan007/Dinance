/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

contract DinancePool {
    address public factory;
    address public token;

    constructor() {
        factory = msg.sender;
    }

    function initialize(address _token) external {
        require(msg.sender == factory, "Dinance Forbidden!");
        token = _token;
    }
}