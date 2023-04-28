/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "./DinancePool.sol";
import "./IDinancePool.sol";

contract DinanceFactory {

    event poolCreated(address token, address pool, uint poolLength);
    
    function createPool(address token) public returns(address pool) {
        bytes memory bytecode = type(DinancePool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token));

        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
    }



}