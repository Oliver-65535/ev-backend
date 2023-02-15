import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationEntity } from 'src/common/station/station/station.entity';
// import { ConnectorEntity } from 'src/common/station/connector/connector.entity';

@Injectable()
export class OCPPService {
  constructor(
    // private eventEmitter: EventEmitter2
    @InjectRepository(StationEntity)
    private readonly stationEntityRepository: Repository<StationEntity>, // @InjectRepository(ConnectorEntity) // private readonly connectorEntityRepository: Repository<ConnectorEntity>,
  ) {}

  receiptIds = [];

  newEvent(data) {
    // const  {chargeBoxId,action, params} =  data;
    console.log(data);
    this.distributorEvenst(data);
  }

  distributorEvenst(data) {
    switch (data.action) {
      case 'BootNotification':
        this.stationConnect(data);
        break;
      case 'disconnect':
        this.stationDisconnect(data);
        break;
      case 'Heartbeat':
        this.stationConnect(data);
        break;
      case 'StatusNotification':
        this.stationConnect(data);
        break;

      default:
        break;
    }
  }

  async stationConnect(data) {
    const staion = await this.stationEntityRepository.findOneBy({
      station_id: data.chargeBoxId,
    });
    console.log(staion);
    if (staion == undefined) return;
    staion.status = 'Connected';
    return await this.stationEntityRepository.save(staion);
  }

  async stationDisconnect(data) {
    const staion = await this.stationEntityRepository.findOneBy({
      station_id: data.chargeBoxId,
    });
    if (staion == undefined) return;
    staion.status = 'Disconnected';
    return await this.stationEntityRepository.save(staion);
  }

  async stationStatusNotification(data) {
    // const staion = await this.stationEntityRepository.findOneBy({
    //   station_id: data.chargeBoxId,
    // });
    // if (!staion) return;
    console.log(data);
    // const connector = await this.connectorEntityRepository.findOneBy({
    //   connector:,
    // });
    // if (staion == undefined) return;
    // staion.status = 'Disconnected';
    // return await this.stationEntityRepository.save(staion);
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

  async createConnectorFetch(id) {
    const queryCreateConnector = JSON.stringify({
      query: `mutation{
        createOneConnector(
          input:{
            connector:{
              connector:"1"
              connector_type:"2",
              consumption:"7"
              status:"Available",
              stationId:${id}
            }
          }
        )
        {
          status
          station{
            station_id
          }
        }
      }`,
    });

    const response = await fetch('http://35.236.79.246:3012/graphql', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: queryCreateConnector,
    });

    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.data;
  }
}