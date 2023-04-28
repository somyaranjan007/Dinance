/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


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

    function deposit(address _token,uint256 _amount,address onBehalfOf) external {
        IERC20(_token).approve(address(this),_amount);
        IERC20(_token).transferFrom(msg.sender,address(this),_amount);
    }

    
}