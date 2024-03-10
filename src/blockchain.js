const SHA256 = require('crypto-js/sha256');
const genesis = require('./genesis.dat');

class Block{
    constructor(blockNo ,filename, fileCID , prevHash=''){
        this.blockNo = blockNo;
        this.fileCID = fileCID;
        this.filename = filename;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.timestamp = Date().toString();
        this.nonce1 = 0;
    }

    calculateHash(){
        return SHA256(this.blockNo + this.filename + this.prevHash + this.fileCID + this.nonce1).toString();
    }

    hexToBinary(hex) {
        return BigInt(`0x${hex}`).toString(4);
    }
    proofOfWork(difficulty){
        while(this.hexToBinary(this.hash).substring(20, 20+(difficulty)) !== Array(difficulty+1).join("0")){
            this.nonce1++;
            this.hash = this.calculateHash();
        }
    }

}
    
class Blockchain{
    constructor(){
        this.chain = [genesis.genesis];
        this.difficulty = 9;
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash; 
        const startTime = Date.now();
        newBlock.proofOfWork(this.difficulty);
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        this.chain.push(newBlock);
        console.log("Block mined: " + JSON.stringify(newBlock ,null , 4));
        console.log("Time to mine Block " + elapsedTime/1000 + "s");
        // this.saveBlockchain(newBlock);
    }

    isChainValid(){

        for(let i=1; i<this.chain.length; i++){
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if(currBlock.hash !== currBlock.calculateHash()){
                return false;
            }

            if(currBlock.prevHash !== prevBlock.hash){
                return false;
            }

        }

        return true;
    }
}


module.exports.Blockchain = Blockchain;
module.exports.Block = Block;


