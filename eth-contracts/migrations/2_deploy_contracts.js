// migrating the appropriate contracts
var verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");

module.exports = function(deployer) {
  deployer.deploy(verifier).then(() => 
  deployer.deploy(SolnSquareVerifier, verifier.address));
}
