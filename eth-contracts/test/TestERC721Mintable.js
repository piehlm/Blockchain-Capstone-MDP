var verifier = artifacts.require('Verifier');
var ERC721Mintable = artifacts.require('MDPERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const baseURI  = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
    var _totalSupply = 0;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i = 5;i<15;i++)
            {
                await this.contract.mint(accounts[i],i,baseURI);
                _totalSupply = _totalSupply + 1;
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            console.log(totalSupply);
            assert.equal(totalSupply,_totalSupply,"Total supply did not match.");            
        })

        it('should get token balance', async function () { 
            var balance = await this.contract.balanceOf(accounts[10]); 
            assert.equal(balance, 1, "token balance is incorrect");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            var tokenUri = await this.contract.tokenURI(10); 
            console.log("token_uri",tokenUri)
            assert.equal(tokenUri, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/10');            
        })

        it('should transfer token from one owner to another', async function () { 
            let account11=  await this.contract.ownerOf(11,{from: account_one});
            let account12=  await this.contract.ownerOf(12,{from: account_one});
            
            await this.contract.transferFrom(account11,account12,11, {from: account11});
           
            let newOwnerOf11 = await this.contract.ownerOf(11,{from: account_one});
            assert.equal(newOwnerOf11, account12, "new owner is not correct");
            var balance = await this.contract.balanceOf(accounts[11]); 
            assert.equal(balance, 0, "Transfer from token balance is incorrect");
            var balance = await this.contract.balanceOf(accounts[12]); 
            assert.equal(balance, 2, "Transfer to token balance is incorrect");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let isMinted = true;
            try {
                await this.contract.mint(accounts[5], 5, "uri", {from: account_two});
            }catch(err){
                isMinted = false;
            }
            assert.equal(isMinted, false, "Token not minted due to incorrect owner");
        })

        it('should return contract owner', async function () { 
            var contractOwner  = await this.contract.getOwner.call({from: account_one}); 
            assert.equal(contractOwner, account_one,"contract owner is not correct");
        })

    });
})