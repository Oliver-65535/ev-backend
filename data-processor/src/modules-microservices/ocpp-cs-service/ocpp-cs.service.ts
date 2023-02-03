import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class OCPPService {
  constructor(
    // private eventEmitter: EventEmitter2
    ) {}

  receiptIds = [];


  newEvent(data){
    const  {chargeBoxId, params} =  data;
    console.log({chargeBoxId, params})
  }


  // async createStartFunctionEvent(data: any): Promise<void> {
  //   data.args = JSON.parse(data.args);
  //   this.eventEmitter
  //     .emitAsync('start-near-function.' + data.method, data)
  //     .then((message) => console.log(message));
  // }

  // async createResultFunctionEvent(data: any): Promise<void> {
  //   //console.log('create result event:', data);
  //   await this.eventEmitter
  //     .emitAsync('result-near-function.' + data.method, data)
  //     .then((message) => console.log(message));
  // }
}
