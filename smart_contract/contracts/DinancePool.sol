/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/IDinanceFactory.sol";

error PoolDoesntExist(string message);

contract DinancePool {
    address public token;
    address public factory;

    mapping(address => uint256) depositor;
    mapping(address => uint256) depositedTime;
    uint256 constant interest = 2;

    mapping(address => uint256) borrower;
    mapping(address => uint256) borrowedTime;
    uint256 constant borrowInterest = 4;

    mapping(address => address) depositedToken;

    struct DepositedData {
        address sender;
        address token;
        uint256 amount;
    }

    DepositedData[] public depositedData;

    constructor() {
        factory = msg.sender;
    }

    function initialize(address _token) external {
        require(msg.sender == factory, "Dinance Forbidden!");
        token = _token;
    }

    function deposit(address _token, uint256 _amount) external {
        (bool poolExist) = IDinanceFactory(factory).checkPool(_token);

        if (!poolExist) {
            revert PoolDoesntExist("You are depositing wrong token!");
        }

        if (depositedTime[msg.sender] > 0) {
            uint256 amountAfterInterest = ((block.timestamp -
                depositedTime[msg.sender]) * interest);
            depositor[msg.sender] += amountAfterInterest;
        }

        depositor[msg.sender] += _amount;
        depositedTime[msg.sender] = block.timestamp;

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        IDinanceFactory(factory).AToken(_token).mint(msg.sender, _amount);
    }

    function withdraw(address _token, uint256 _amount, address to) external {
        uint256 amountAfterInterest = ((block.timestamp -
            depositedTime[msg.sender]) * interest) + _amount;

        IDinanceFactory(factory).AToken(_token).burn(to, _amount);
        IERC20(_token).transfer(to, amountAfterInterest);

        depositor[msg.sender] -= _amount;

        if (depositor[msg.sender] == 0) {
            depositedTime[msg.sender] = 0;
        } else {
            depositedTime[msg.sender] = 0;
        }
    }

    function borrow(address _token, uint256 _amount) external {
        require(
            depositor[msg.sender] > _amount,
            "You don't have enough amount!"
        );
        (bool poolExist) = IDinanceFactory(factory).checkPool(_token);
        if (!poolExist) {
            revert PoolDoesntExist("You are borrowing wrong token!");
        }

        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "pool doesn't have enough tokens to borrow!"
        );
        borrowedTime[msg.sender] = block.timestamp;
        borrower[msg.sender] = _amount;
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function repay(address _token, uint256 _amount, address _account) external {
        require(borrower[msg.sender] == _amount, "you don't have debt!");
        IERC20(_token).transfer(address(this), _amount);

    }
}
