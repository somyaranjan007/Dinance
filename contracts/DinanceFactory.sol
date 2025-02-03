/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

/* We are imporing DinancePool and  */
import "./DinancePool.sol";
import "./DinanceAToken.sol";

/* We are imporing DinancePool and Interface of DinancePool */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/* This is Dinance Factory Contract for making Dinance pool */
contract DinanceFactory {
    address[] public reserveTokens;
    address[] public poolMarket;

    DinancePool public DinancePoolContract;
    DinanceAToken public dinanceAToken;

    mapping(address => address) public Pool;
    mapping(address => address) public AToken;

    uint256 public totalAmount;

    struct TokenProperty {
        address tokenAddress;
        string name;
        string symbol;
    }

    bool public poolExist;

    event poolCreated(address _token, address pool, uint poolLength);

    constructor(TokenProperty[] memory _tokenPools) {
        for (uint256 i = 0; i < _tokenPools.length; i++) {
            reserveTokens.push(_tokenPools[i].tokenAddress);

            DinancePoolContract = new DinancePool();
            DinancePoolContract.initialize(_tokenPools[i].tokenAddress);

            poolMarket.push(address(DinancePoolContract));
            Pool[_tokenPools[i].tokenAddress] = address(DinancePoolContract);

            dinanceAToken = new DinanceAToken(
                _tokenPools[i].tokenAddress,
                _tokenPools[i].name,
                _tokenPools[i].symbol
            );

            AToken[_tokenPools[i].tokenAddress] = address(dinanceAToken);

            emit poolCreated(_tokenPools[i].tokenAddress, address(DinancePoolContract), poolMarket.length);
        }
    }

    function checkPool(address _token) public returns (bool) {
        for (uint256 i = 0; i < reserveTokens.length; i++) {
            if (reserveTokens[i] == _token) {
                poolExist = true;
                break;
            }
        }

        return poolExist;
    }

    function totalSupply() public returns(uint256) {
        for(uint256 i = 0; i < poolMarket.length; i++) {
            totalAmount += IERC20(reserveTokens[i]).balanceOf(poolMarket[i]);
        }

        return totalAmount;
    }
}
