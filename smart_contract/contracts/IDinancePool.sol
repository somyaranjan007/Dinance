/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

interface IDinancePool {
    function initialize(address _token) external;
    function deposit(address _token,uint256 _amount,address onBehalfOf) external;
    function withdraw(address _token,uint256 _amount,address to) external returns (uint256);
    function depositCollateral(address _token,uint256 _amount) external;
    function borrow(address _token,uint256 _amount,address onBehalfOf) external;
    function repay(address _token,uint256 _amount,address onBehalfOf) external;
}