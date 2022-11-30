import { Controller, Get } from '@nestjs/common';
import { EvmService } from './evm.service';

//////////
//for test
import * as fs from 'fs';
//////////

@Controller('evm')
export class EvmController {
  constructor(private readonly evmService: EvmService) {}

  @Get()
  getEvmTest(): any {
    //////FOR TEST
    // const tokenId = JSON.parse(fs.readFileSync("src/ipfs/lastId.json", { encoding: "utf-8" })).tokenId + 1;
    // const metaPrivate = JSON.parse(fs.readFileSync("src/ipfs/meta-private.json", { encoding: "utf-8" }));
    // const metaOpen = JSON.parse(fs.readFileSync("src/ipfs/meta-open.json", { encoding: "utf-8" }));
    // fs.writeFileSync("src/ipfs/lastId.json", JSON.stringify({ tokenId: tokenId }));
    /////
    // return this.evmService.ipfsSend({
    //   tokenId: tokenId,
    //   json1: metaOpen,
    //   json2: metaPrivate,
    // });
    return 'evm run';
  }
}
