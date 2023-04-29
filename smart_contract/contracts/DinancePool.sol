/* SPDX-License-Identifier: MIT */
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DinancePool {
    address public factory;
    address public token;
    mapping(address=>uint256) depositor;
    mapping(address=>uint256) depositedTime;
    mapping(address=>uint256) borrower;
    mapping(address=>uint256) borrowedTime;
    
    uint256 public constant interest=(2 * 1e9) /(365 * 24 * 60 * 60);
    uint256 public constant borrowInterest=(4 * 1e9) /(365 * 24 * 60 * 60);
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
        require(depositor[msg.sender]>=_amount,"dont have any amount to withdraw");
        uint256 amountAfterInterest=((depositedTime[msg.sender]-block.timestamp) * interest) + _amount;  
        IERC20(AToken[_token].burn(to,_amount));
        depositor[msg.sender]=0;
        depositedTime[msg.sender]=0;
        IERC20(_token).transfer(to,amountAfterInterest);

    }

    function borrow(address _token,uint256 _amount,address onBehalfOf) external{
        borrower[msg.sender]+=_amount;
        borrowedTime[msg.sender]=block.timestamp;
        //user will borrow from the deposited token
        IERC20(_token).transfer(msg.sender,_amount);
        //user will charge with the interest 
 
    }

    function repay(address _token,uint256 _amount,address onBehalfOf) external {
        require(borrower[msg.sender]>=_amount,"you havent borrowed anytoken yet");
        uint256 amountAfterInterestCharged=_amount - ((borrowedTime[msg.sender]-block.timestamp) * borrowInterest);
         

    }
}
