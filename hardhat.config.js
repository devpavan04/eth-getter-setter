require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

const defaultNetwork = 'localhost';

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.TESTNET_PK}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.TESTNET_PK}`],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.TESTNET_PK}`],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.TESTNET_PK}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
