const PBKDF2= require("crypto-js/pbkdf2");

function fileCID(hexDigest){

    var key = PBKDF2(hexDigest.substring(0, 32), hexDigest.substring(32,65), {keySize: 24, iterations: 1100});
    //test
    var fhex = '';
    for(let i=0; i<key.words.length; i++){
        key.words[i] = key.words[i] >>> 0;
    }

    for(let i=0; i<8; i++){
        fhex += key.words[i].toString(23);
    }
    return fhex;
}

module.exports = {fileCID};
