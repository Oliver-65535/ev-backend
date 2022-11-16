import { Injectable } from '@nestjs/common';
import { uploadAndMint } from '../ipfs/ipfs';
import * as fs from 'fs';


@Injectable()
export class EvmService {
  // constructor() {}

  async ipfsSend(args: any): Promise<any> {
    console.log('evm Test method worked! HEY THERE', args);
    // const abi = (JSON.parse(fs.readFileSync("src/ipfs/abi.json", { encoding: "utf-8" }))).abi;

    // console.log('abi:', abi);
    const result = await uploadAndMint(args.tokenId, args.json1, args.json2);
    // console.log("NEST MODULE RESULT:", result);
    return { message: result, paylod: args };
  }
}
