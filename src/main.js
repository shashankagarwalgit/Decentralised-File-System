const { Blockchain, Block } = require("./blockchain");
const fs = require("fs").promises;
const crypto = require("crypto");
const { fileCID } = require("./filecid");

const filesData = new Blockchain();
//test
const files = ['./src/genesis.dat']; //file names

const hexDigests = [];

async function processFiles() {
  for (const file of files) {
    const fileBuffer = await fs.readFile(file);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    const hexDigest = hash.digest('hex');
    hexDigests[file] = hexDigest;
  }

  for (let j = 0; j < files.length; j++) {
    filesData.addBlock(new Block(files[j].substring(2, files[j].length), fileCID(hexDigests[files[j]])));
  }
 
  console.log("Is Chain Valid? ", filesData.isChainValid());
  console.log(JSON.stringify(filesData.chain ,null , 4));
}

processFiles().catch(console.error);

