import EthCrypto from 'eth-crypto';
import fs from 'fs';
import { NFTStorage, File, Blob } from 'nft.storage';
import "dotenv/config.js";
import ethers from "ethers";


const tokenId = 8;

const abi = (JSON.parse(fs.readFileSync("./abi.json", { encoding: "utf-8" }))).abi;
// console.log("ABI:", abi);


const account = {
    address: process.env.ACCOUNT_ADDRESS,
    privateKey: process.env.ACCOUNT_PRIVATEKEY
};
console.log("account:", account);

const metaPrivate = JSON.parse(fs.readFileSync("./meta-private.json", { encoding: "utf-8" }));
// console.log("metaPrivate:", metaPrivate);

const metaOpen = JSON.parse(fs.readFileSync("./meta-open.json", { encoding: "utf-8" }));
// console.log("metaOpen:", metaOpen);

const nftStorageToken = process.env.NFT_STORAGE_TOKEN
// console.log("NFT_STORAGE_TOKEN", NFT_STORAGE_TOKEN);


async function prepareAndDownload(metaOpen, metaPrivate) {
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

async function checkURI(tokenId) {
    const RPCprovider = new ethers.providers.JsonRpcProvider(process.env.ETH_NODE_URL);
    const erc721 = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, RPCprovider);
    let answer = await erc721.tokenURI(tokenId);
    console.log("URI FOR TOKEN ID", tokenId, " is:", answer);
}

async function mintCertificate(abi, tokenId, URI, mintTo = account.address) {
    const RPCprovider = new ethers.providers.JsonRpcProvider(process.env.ETH_NODE_URL);
    const signer = new ethers.Wallet(account.privateKey, RPCprovider);
    const balanceB = await signer.getBalance();
    console.log("Signer balance:", ethers.utils.formatEther(balanceB));
    const erc721 = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, RPCprovider);
    let estimateGas = (await erc721.connect(signer).estimateGas.safeMint(mintTo, tokenId, URI));
    let feeData = await RPCprovider.getFeeData();
    let fees = await calcMaxFees(RPCprovider, estimateGas, feeData);
    let options = { maxPriorityFeePerGas: fees.priorityFees[1], maxFeePerGas: fees.maxFees[1] }

    console.log("GAS OPTIONS", options);

    let receipt = await erc721.connect(signer).safeMint(mintTo, tokenId, URI);
    // console.log(receipt);
    console.log("----------------------------------------------------------");
    console.log("-- Signer minted tokens to ", mintTo);
    console.log("----------------------------------------------------------");

    let completedTxHash = await txTracking(receipt, process.env.txTracking_confirms, process.env.txTrackint_timeout)

    return {
        status: 'OK',
        txHash: completedTxHash,
        txConfirmations: process.env.txTracking_confirms,
        mintedTokenId: tokenId
    };
}


async function calcMaxFees(RPCprovider, estimatedGas, feeData, minimal = []) {
    ///Mults later can be setted in chains settings,
    // or get from extern API, or calculated from service
    // [Average, Fast, Fastest]
    let mults = [50, 90, 140];
    let multsBase = [100, 113, 125];
    let baseMult = 200;
    let divider = 100;
    let min = minimal.length > 0 ? minimal : [ethers.BigNumber.from('0')];
    let block = await RPCprovider.getBlockNumber();
    let baseFee = (await RPCprovider.getBlock(block)).baseFeePerGas;
    let maxBaseFee = baseFee.mul(baseMult).div(divider);
    let priorityFee;
    if (feeData.maxPriorityFeePerGas)
        priorityFee = (feeData.maxPriorityFeePerGas).gte(min[0]) ? feeData.maxPriorityFeePerGas : min[0];
    else {
        throw {
            description: "feeData inaccessible. Check if Chain supports EIP1559 gas calculation. Check network connection",
            code: "CHAIN_SETTINGS_ERROR"
        }
    }
    console.log("baseFee:", ethers.utils.formatUnits(baseFee, "gwei"));
    let priorityFeesArr = [];
    let maxFeesArr = [];
    // let approxTxPrices = [];
    // let maxTxPrices = [];
    mults.forEach((mult, i) => {
        priorityFeesArr.push(priorityFee.mul(mult).div(divider));
        maxFeesArr.push(priorityFeesArr[i].add(maxBaseFee));
        //   approxTxPrices.push(((baseFee.mul(multsBase[i]).div(divider)).add(priorityFeesArr[i])).mul(estimatedGas));
        //   maxTxPrices.push(ethers.utils.formatUnits(estimatedGas.mul(maxFeesArr[i]), units));
        //   priorityFeesArr[i] = ethers.utils.formatUnits(priorityFeesArr[i], units);
        //   maxFeesArr[i] = ethers.utils.formatUnits(maxFeesArr[i], units);
        //   approxTxPrices[i] = ethers.utils.formatUnits(approxTxPrices[i], units);
    });
    console.log("priorityFeesArr:", priorityFeesArr);
    console.log("maxFeesArr:", maxFeesArr);
    // console.log("approxTxPrices:", approxTxPrices);
    // console.log("maxTxPrices:", maxTxPrices);
    return {
        priorityFees: priorityFeesArr,
        maxFees: maxFeesArr,
        //   approxTxPrices: approxTxPrices,
        //   maxTxPrices: maxTxPrices
    }
}

async function txTracking(txReceipt, confirmsTotal, txTimeout) {
    try {
        //   let currentTx = await RPCprovider.getTransaction(parsedAnswer.txHash);

        let confirmCnt = txReceipt.confirmations;
        let timeoutRes = false;
        let receipt;
        let txPrice;
        let txConfirmations;
        if (confirmCnt == 0) {
            let timeout = new Promise(resolve =>
                setTimeout(() =>
                    resolve('Timeout'), txTimeout));
            await Promise.race([
                timeout,
                txReceipt.wait(confirmCnt + 1)
            ])
                .then((value) => {
                    console.log(value);
                    if (value == 'Timeout')
                        timeoutRes = true;
                    else
                        receipt = value;
                });
        } else {
            receipt = await txReceipt.wait(1);
            confirmCnt = receipt.confirmations;
            confirmsTotal = confirmCnt + 1;
        }
        if (timeoutRes) {
            return {
                status: "PENDING_TIMEOUT",
                data: {
                    txHash: txReceipt.hash,
                    txNonce: txReceipt.nonce,
                    txFrom: txReceipt.from,
                    txTo: txReceipt.to
                }
                ,
            };
            // await delay(20000); //uncomment to check situation when tx confirmed same time with timeout
            confirmsTotal = 0;
        } else {
            txPrice = ethers.utils.formatUnits((receipt.gasUsed).mul(receipt.effectiveGasPrice), "gwei");
        }
        confirmCnt++;
        while (confirmCnt <= confirmsTotal) {
            console.log("waiting for confirm", confirmCnt);
            receipt = await txReceipt.wait(confirmCnt);
            // console.log(receipt);
            txConfirmations = receipt.confirmations;
            let stat = confirmCnt == confirmsTotal ? "OK" : "TRACKING";
            console.log({
                status: stat,
                txHash: txReceipt.hash,
                txNonce: txReceipt.nonce,
                txFrom: receipt.from,
                txTo: receipt.to,
                txPrice: txPrice,
                txConfirmations: txConfirmations,
            });
            confirmCnt++;
        }
        return receipt.hash
    } catch (error) {
        //   throw {
        //     description: error,
        //     code: ""
        //   }
        console.log("----ERROR:", error);
    }
}


async function main() {
    console.log("TEST START");
    // const testURI = "ipfs://bafkreiej7jkxgvywocqcmalidbqc37ztrstwliqisba4efs3ojgcqpsv6q";
    let [URIforMint, CIDopen, CIDprivate] = await prepareAndDownload(metaOpen, metaPrivate);
    let result = await mintCertificate(abi, tokenId, URIforMint /*, mintTo*/);
    console.log("RESULT:", result);
    await checkURI(tokenId);
    console.log("URIforMint:", URIforMint);
}

main();