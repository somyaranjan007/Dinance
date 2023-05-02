const { ethers } = require('hardhat');
const { expect } = require('chai');
const fs = require('fs');

describe("Dinance: The Lending and Borrowing Protocol Testing", function() {
    let deployer;

    const poolToken = [
        {
            tokenAddress: 0x6B175474E89094C44Da98b954EedeAC495271d0F,
            name: "aDAIToken",
            symbol: "aDAI"
        },
        {
            tokenAddress: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,
            name: "aUSDCToken",
            symbol: "aUSDC"
        },
        {
            tokenAddress: 0xdAC17F958D2ee523a2206206994597C13D831ec7,
            name: "aUSDTToken",     
            symbol: "aUSDT"
        },
        {
            tokenAddress: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
            name: "aWETHToken",
            symbol: "aWETH"
        }
    ]

    before(async function() {
        [deployer] = await ethers.getSigners();

        const DinanceContractFactoryTest = await ethers.getContractFactory(
            "contracts/DinanceFactory:DinanceFactory.sol",
            deployer
        );

        const DinanceFactoryTest = await DinanceContractFactoryTest.deploy(poolToken);
        await DinanceFactoryTest.deployed();

        console.log(DinanceFactoryTest);

        
    })
})