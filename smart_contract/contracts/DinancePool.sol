/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DinancePool {
    address public factory;
    address public token;
    mapping(address=>uint256) depositor;
    mapping(adresss=>uint256) depositedTime;
    
    uint256 constant interest=(2 * 1e9) /(365 * 24 * 60 * 60);
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
        depositor[msg.sender]+=amount;
        depositedTime[msg.sender]=block.timestamp;
        createAToken(_token, _name, _symbol);
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        IERC20(AToken[_token]).mint(msg.sender, _amount);
    }

    function withdraw(address _token,uint256 _amount,address to) external{
        uint256 amountAfterInterest=((depositedTime[msg.sender]-block.timestamp) * interest) + _amount;  
        IERC20(AToken[_token].burn(to,_amount));
        IERC20(_token).transfer(to,_amount );

    }

    function borrow(address _token,uint256 _amount,address onBehalfOf) external{
        //user will borrow from the deposited token
        //user will charge with the interest 
        
        
    }

    function repay(address _token,uint256 _amount,address onBehalfOf) external {

    }
}
