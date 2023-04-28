/* SPDX-License-Identifier */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DinanceAToken is ERC20 {
    address public underlyingAddress;

    constructor(
        address _underlyingAddress,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        underlyingAddress = _underlyingAddress;
    }

    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) public {
        _burn(_account, _amount);
    }
}