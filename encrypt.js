const Cryptr = require('cryptr');
const uuid = require("uuid");

let v4_encrypt = uuid.v4();

const cryptr = new Cryptr("UD");


function EncryptString(string)
{
    cryptr.encrypt(string);
}

function DecryptString(string)
{
    cryptr.decrypt(string);
}

function EncryptAndDebugString(string)
{
    console.log(cryptr.encrypt(string));
}

function DecryptAndDebugString(string)
{
    console.log(cryptr.decrypt(string));
}

function encrypt_v5(elemnt) {
    cryptr.encrypt(elemnt);
}

module.exports = { EncryptString, DecryptString, EncryptAndDebugString, DecryptAndDebugString, encrypt_v5 };