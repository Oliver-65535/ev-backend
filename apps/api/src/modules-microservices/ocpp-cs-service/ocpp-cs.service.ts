import { Injectable } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChargePointEntity } from 'src/common/chargePoint/chargePoint/chargePoint.entity';
import { ConnectorEntity } from 'src/common/chargePoint/connector/connector.entity';

@Injectable()
export class OCPPService {
  constructor(
    // private eventEmitter: EventEmitter2
    @InjectRepository(ChargePointEntity)
    private readonly chargePointEntityRepository: Repository<ChargePointEntity>,
    @InjectRepository(ConnectorEntity)
    private readonly connectorEntityRepository: Repository<ConnectorEntity>,
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
        this.stationStatusNotification(data);
        break;

      default:
        break;
    }
  }

  async stationConnect(data) {
    const staion = await this.chargePointEntityRepository.findOneBy({
      chargePointHardwareId: data.chargeBoxId,
    });
    console.log(staion);
    if (staion == undefined) return;
    staion.status = 'Connected';
    return await this.chargePointEntityRepository.save(staion);
  }

  async stationDisconnect(data) {
    const staion = await this.chargePointEntityRepository.findOneBy({
      chargePointHardwareId: data.chargeBoxId,
    });
    if (staion == undefined) return;
    staion.status = 'Disconnected';
    return await this.chargePointEntityRepository.save(staion);
  }

  async stationStatusNotification(data) {
    const connId = await this.queryConnectorFetch(
      data.chargeBoxId,
      data.params.connectorId,
    );
    console.log(connId.connectors[0].id);

    return await this.updateConnectorFetch(
      connId.connectors[0].id,
      data.params.status,
    );
    // const connector = await this.connectorEntityRepository.findOneBy({
    //   connectorId: 1,
    //   chargePointHardwareId: data.chargeBoxId,
    // });
    // if (!connector) return;
    // connector.statusName = data.params.status;

    // return await this.connectorEntityRepository.save(connector);
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

  async queryConnectorFetch(hargePointHardwareId, connectorId) {
    const queryCreateConnector = JSON.stringify({
      query: `query{
        connectors(filter:{chargePointHardwareId:{eq:"${hargePointHardwareId}"},connectorId:{eq:${connectorId}}}){
          id
        }
      }`,
    });
    const response = await fetch('http://35.236.79.246:3012/graphql', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: queryCreateConnector,
    });
    const responseJson = await response.json();
    // console.log(responseJson);
    return responseJson.data;
  }

  async updateConnectorFetch(connectorId, status) {
    const queryCreateConnector = JSON.stringify({
      query: `mutation{
        updateOneConnector(input:{id:${connectorId},update:{statusName:"${status}"}}){
          id
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
