import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationEntity } from 'src/common/charge-station/station-graphql/station.entity';



@Injectable()
export class OCPPService {
  constructor(
    // private eventEmitter: EventEmitter2
    @InjectRepository(StationEntity)
    private readonly stationEntityRepository: Repository<StationEntity>,

    ) {}

  receiptIds = [];


  newEvent(data){
    // const  {chargeBoxId,action, params} =  data;
     console.log(data)
    this.distributorEvenst(data)
  }


  distributorEvenst(data){
    switch (data.action) {
      case "BootNotification":
        this.stationConnect(data);
        break;
      case "Heartbeat":
        this.stationConnect(data);
        break;
    
      default:
        break;
    }
  }
 


  async stationConnect(data){
    const staion = await this.stationEntityRepository.findOneBy({ station_id:data.chargeBoxId });
    console.log(staion)
    if(staion == undefined) return;  
    staion.status = "Connected"
    return await this.stationEntityRepository.save(staion) ;
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
