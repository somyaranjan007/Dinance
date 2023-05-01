/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

/* We are imporing DinancePool and Interface of DinancePool */
import "./DinancePool.sol";
import "./IDinancePool.sol";

/* This is Dinance Factory Contract for making Dinance pool */
contract DinanceFactory {
    address[] public poolMarket;
    address[] public reserveTokens;
    bool public poolExist;

    event poolCreated(address _token, address pool, uint poolLength);

    function createPool(address _token) public returns (address pool) {
        reserveTokens.push(_token);
        bytes memory bytecode = type(DinancePool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_token));

        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        IDinancePool(pool).initialize(_token);
        poolMarket.push(pool);

        emit poolCreated(_token, pool, poolMarket.length);
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
}
