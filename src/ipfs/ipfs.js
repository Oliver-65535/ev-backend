import EthCrypto from 'eth-crypto';
import fs from 'fs';
import { NFTStorage, File, Blob } from 'nft.storage';
import "dotenv/config.js";

const Account = {
    address: "0x931EF37c2AdF9338E05207EaDcf51B86445A7ECa",
    privateKey: "bc77ca56470643b11b2aa585fef6bc628a1dfdb48fc3c5c49f8061406ad026d9"
}

const metaPrivate = JSON.parse(fs.readFileSync("./meta-private.json", { encoding: "utf-8" }));
// console.log("metaPrivate:", metaPrivate);

const metaOpen = JSON.parse(fs.readFileSync("./meta-open.json", { encoding: "utf-8" }));
// console.log("metaOpen:", metaOpen);

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN
// console.log("NFT_STORAGE_TOKEN", NFT_STORAGE_TOKEN);


async function prepareAndDownload(account, metaOpen, metaPrivate, nftStorageToken) {
    const publicKey = EthCrypto.publicKeyByPrivateKey(
        account.privateKey
    );
    // console.log("generated pubKey:", publicKey);
    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey,
        JSON.stringify(metaPrivate)
    );
    console.log("Encrypted data:", encrypted);

    // const message = await EthCrypto.decryptWithPrivateKey(
    //     account.privateKey,
    //     encrypted
    // );
    // console.log("Decrypted data:", JSON.parse(message));



    const dataPrivate = JSON.stringify(encrypted);
    // console.log("dataPrivate:", dataPrivate);

    const CIDprivate = await uploadToIPFS(dataPrivate, nftStorageToken);
    console.log("CID for private data:", CIDprivate);

    metaOpen.private_data_url = "ipfs://" + CIDprivate;
    // console.log("metaOpen:", metaOpen);
    const dataOpen = JSON.stringify(metaOpen);
    // console.log("dataOpen:", dataOpen);
    const CIDopen = await uploadToIPFS(dataOpen, nftStorageToken);
    console.log("CID for open data:", CIDopen);

    const URIforMint = "ipfs://" + CIDopen;
    console.log("URIforMint:", URIforMint);

    return [URIforMint, CIDopen, CIDprivate]

}

async function uploadToIPFS(data, nftStorageToken) {

    const client = new NFTStorage({ token: nftStorageToken });
    // console.log("DATA:", data);
    const dataBlob = new Blob([data], {
        type: "application/json;charset=utf-8"
    });
    const result = await client.storeBlob(dataBlob)
    return result;
}

prepareAndDownload(Account, metaOpen, metaPrivate, NFT_STORAGE_TOKEN);
