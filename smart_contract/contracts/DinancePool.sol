/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DinanceFactory.sol";
import "./DinanceAToken.sol";

error PoolDoesntExist(string message);

contract DinancePool {
    address public token;
    address public factory;
    mapping(address => uint256) depositor;
    mapping(adresss => uint256) depositedTime;
    mapping(address => DinanceAToken) AToken;

    struct TokenProperty {
        address tokenAddress;
        string name;
        string symbol;
    }

    DinanceFactory pool = new DinanceFactory();

    uint256 constant interest = (2 * 1e9) / (365 * 24 * 60 * 60);
    uint256 constant borrowInterest = (2 * 1e9) / (365 * 24 * 60 * 60);

    constructor(TokenProperty[] memory _tokenPools) {
        factory = msg.sender;
        for (uint256 i = 0; i < _tokenPools.length; i++) {
            address createdPool = pool.createPool(_tokenPools[i].tokenAddress);

            AToken[_tokenPools[i].tokenAddress] = new DinanceAToken(
                _tokenPools[i].tokenAddress,
                _tokenPools[i].name,
                _tokenPools[i].symbol
            );
        }
    }

    function initialize(address _token) external {
        require(msg.sender == factory, "Dinance Forbidden!");
        token = _token;
    }

    function deposit(address _token, uint256 _amount) external {
        bool poolExist = pool.checkPool(_token);
        if (!poolExist) {
            revert PoolDoesntExist("You are depositing wrong token!");
        }

        if (depositedTime[msg.sender] > 0) {
            uint256 amountAfterInterest = ((block.timestamp -
                depositedTime[msg.sender]) * interest);
            depositor[msg.sender] += amountAfterInterest;
        }

        depositor[msg.sender] += amount;
        depositedTime[msg.sender] = block.timestamp;

        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        IERC20(AToken[_token]).mint(msg.sender, _amount);
    }

    function withdraw(address _token, uint256 _amount, address to) external {
        uint256 amountAfterInterest = ((depositedTime[msg.sender] -
            block.timestamp) * interest) + _amount;

        IERC20(AToken[_token].burn(to, _amount));
        IERC20(_token).transfer(to, amountAfterInterest);

        depositor[msg.sender] -= _amount;

        if (depositor[msg.sender] > 0) {
            depositedTime[msg.sender] = block.timestamp;
        } else {
            depositedTime[msg.sender] = 0;
        }
    }

    function borrow(
        address _token,
        uint256 _amount,
        address onBehalfOf
    ) external {}

    function repay(
        address _token,
        uint256 _amount,
        address onBehalfOf
    ) external {}
}
