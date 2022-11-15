import { Injectable } from '@nestjs/common';

@Injectable()
export class EvmService {
  // constructor() {}

  async ipfsSend(args: any): Promise<any> {
    console.log('evm Test method worked!', args);
    return { message: 'evm Test method worked!', paylod: args };
  }
}
