const EthCrypto = require('eth-crypto');

const Account = {
    address: "0x931EF37c2AdF9338E05207EaDcf51B86445A7ECa",
    pubKey: "",
    privateKey: "bc77ca56470643b11b2aa585fef6bc628a1dfdb48fc3c5c49f8061406ad026d9"
}

async function main() {
    const publicKey = EthCrypto.publicKeyByPrivateKey(
        Account.privateKey
    );
    console.log(publicKey);
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey,
        "hello world!"
    );
    console.log(encrypted);
    const message = await EthCrypto.decryptWithPrivateKey(
        Account.privateKey,
        encrypted
    );
    console.log(message);

}

main();
