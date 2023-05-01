const { ethers } = require("hardhat");

const main = async () => {
    const DinancePoolFactory = await ethers.getContractFactory("");
}

main().then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1);
})