/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "../DinanceAToken.sol";
import "../DinancePool.sol";

interface IDinanceFactory {
    function reserveTokens() external view returns(address[] memory);
    function poolMarket() external view returns(address[] memory);
    function DinancePoolAddress(address _token) external view returns(DinancePool);
    function AToken(address _token) external view returns(DinanceAToken);
    function checkPool(address _token) external returns (bool);
    function totalSupply() external returns(uint256);
}