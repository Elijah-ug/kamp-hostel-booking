require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    optimiser: {
      enabled: true,
      runs: 50
    }
  },
  networks: {
    celoAlfajores: {
      url: process.env.CELO_ALFAJORES_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    }
  }
}
