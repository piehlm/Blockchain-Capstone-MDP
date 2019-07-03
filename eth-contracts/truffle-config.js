const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "https://rinkeby.infura.io/v3/59374b57dc714fb7af0f2b5e5eaa7b13";
const mnemonic = "fiscal picnic also favorite dove step copper similar season label approve best";

module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraKey),
      network_id: "4",       // Rinkeby
      gasPrice: 21000000000,
//      from: "0xAD7f0a3DfD850B1Ea912e254934D745511Fbaa1A",
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.2",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
}
