const { ethers } = require("hardhat");

const main = async () => {

    const poolToken = [
        {
            tokenAddress: "0x68194a729C2450ad26072b3D33ADaCbcef39D574",
            name: "aDAIToken",
            symbol: "aDAI"
        },
        {
            tokenAddress: "0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f",
            name: "aUSDCToken",
            symbol: "aUSDC"
        },
        {
            tokenAddress: "0x0Bd5F04B456ab34a2aB3e9d556Fe5b3A41A0BC8D",
            name: "aUSDTToken",     
            symbol: "aUSDT"
        },
        {
            tokenAddress: "0xD0dF82dE051244f04BfF3A8bB1f62E1cD39eED92",
            name: "aWETHToken",
            symbol: "aWETH"
        }
    ]

    const DinanceFactory = await ethers.getContractFactory("DinanceFactory");
    const Dinance = await DinanceFactory.deploy(poolToken);

    await Dinance.deployed();

    console.log(`Dinance Factory: ${Dinance.address}`);
}

main().then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1);
})