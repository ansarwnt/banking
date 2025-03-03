require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache:{
      url: "http://127.0.0.1:7545",
      accounts:["0xbb650ce7c10911c50540dde441f2deb2d41c874736d65cf0e0af7c702a0d638c"]
    }
  }
};
