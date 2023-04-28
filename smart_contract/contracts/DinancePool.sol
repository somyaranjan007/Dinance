/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DinanceAToken.sol";

contract DinancePool {
    address public factory;
    address public token;

    mapping(address => DinanceAToken) AToken;

    constructor() {
        factory = msg.sender;
    }

    function initialize(address _token) external {
        require(msg.sender == factory, "Dinance Forbidden!");
        token = _token;
    }

    function createAToken(
        address _token,
        string memory _name,
        string memory _symbol
    ) internal {
        AToken[_token] = new DinanceAToken(_token, _name, _symbol);
    }

    function deposit(
        address _token,
        uint256 _amount,
        address onBehalfOf,
        string memory _name,
        string memory _symbol
    ) external {
        createAToken(_token, _name, _symbol);
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        IERC20(AToken[_token]).mint(msg.sender, _amount);
    }
}