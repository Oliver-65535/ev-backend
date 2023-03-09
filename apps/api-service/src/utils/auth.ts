// // import ethUtil from "ethereumjs-util";
// import { randomBytes } from "crypto";

// type resultAuth = {
//     publicAddress: string,
//     result: boolean
// }

// module.exports = {
//     auth, generateString
// }

// async function auth(publicAddress: string, msg: string, signature: string): Promise<resultAuth> {
//     var addrVerifi = verify(msg, signature);
//     return {
//         publicAddress: publicAddress,
//         result: publicAddress == addrVerifi
//     };
// }

// function verify(msg: string, signature: string): string {
//     var msgHash = ethUtil.hashPersonalMessage(new Buffer(msg));

//     var signatureParams = ethUtil.fromRpcSig(signature);

//     var publicKey = ethUtil.ecrecover(msgHash,
//         signatureParams.v, signatureParams.r, signatureParams.s);

//     var addressBuffer = ethUtil.publicToAddress(publicKey);
//     var address = ethUtil.bufferToHex(addressBuffer);

//     return address;
// }

// function generateString(size: number): string {
//     return randomBytes(size).toString('hex');
// }
