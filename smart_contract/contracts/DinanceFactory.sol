/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "./DinancePool.sol";
import "./IDinancePool.sol";

contract DinanceFactory {

    event poolCreated(address _token, address pool, uint poolLength);
    
    function createPool(address _token) public returns(address pool) {
        bytes memory bytecode = type(DinancePool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_token));

        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        IDinancePool(pool).initialize(_token);
    }



}