const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const verifier = artifacts.require('Verifier');
const proveme = require('../../zokrates/code/square/proof');

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Test solution functions', async function () {
        beforeEach(async function (){
            try{
                var verifierTest = await verifier.new({from: account_one});
                this.contract = await SolnSquareVerifier.new(verifierTest.address, {from: account_one});
            }catch(error){
                console.log("error in beforeeach: ", error);
            }
        })
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('a new solution can be added for contract - SolnSquareVerifier', async function(){
            let index = 3;
            let solver = accounts[index];
            let result = false;
            try{
                await this.contract.addSolution(index, solver);
                result = true;
            }catch(error){
                console.log("New solution cannot be added for contract: ", error);
            }
            assert.equal(result, true, "Solution not added for the contract.");
        })

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('an ERC721 token can be minted for contract - SolnSquareVerifier', async function(){
            let index = 4;
            let solver = accounts[4];
            let result = false;
            try{
                 if(await this.contract.mintNewNFT(solver, index, proveme.proof.A,
                    proveme.proof.A_p, proveme.proof.B, proveme.proof.B_p, 
                    proveme.proof.C, proveme.proof.C_p, proveme.proof.H, 
                    proveme.proof.K, proveme.input)){
                        result = true;
                    }
            }catch(error){
                console.log("error in an ERC721 token can be minted for contract: ", error);
            }
            assert.equal(result, true,"New token not minted for contract.");
        })
        it('an ERC721 token can NOT be minted for same solution - SolnSquareVerifier', async function(){
            let index = 5;
            let solver = accounts[5];
            let result = false;
            try{await this.contract.mintNewNFT(solver, 4, proveme.proof.A,
                proveme.proof.A_p, proveme.proof.B, proveme.proof.B_p, 
                proveme.proof.C, proveme.proof.C_p, proveme.proof.H, 
                proveme.proof.K, proveme.input)
            }catch(error){

            }
            try{
                if(await this.contract.mintNewNFT(solver, index, proveme.proof.A,
                    proveme.proof.A_p, proveme.proof.B, proveme.proof.B_p, 
                    proveme.proof.C, proveme.proof.C_p, proveme.proof.H, 
                    proveme.proof.K, proveme.input)){
                        result = true;
                }
            }catch(error){
//                console.log("This is a valid error.  Need a new solution.", error);
            }
            assert.equal(result, false,"mint new token false.");
        })    
    })
})