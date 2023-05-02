const { ethers } = require("hardhat");

const main = async () => {

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

    const DinanceFactory = await ethers.getContractFactory("DinanceFactory");
    const DinanceFac = await DinanceFactory.deploy(poolToken);

    await DinanceFac.deployed();

    console.log(DinanceFac);
}

main().then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1);
})