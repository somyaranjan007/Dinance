require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_PRIVATE_kEY = process.env.SEPOLIA_PRIVATE_kEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    Sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_kEY],
      chainId: 11155111,
      blockConfirmation: 5
    }
  }
};
