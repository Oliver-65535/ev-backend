import { Injectable } from '@nestjs/common';

@Injectable()
export class CallChargePoint {
  client: any; // replace any with the type of the client if known

  constructor(client: any) {
    this.client = client;
  }

  async getNumConnectors(): Promise<any> {
    const response = await this.client.call('GetConfiguration', {
      key: ['NumberOfConnectors'],
    });
    console.log(response);
    return response;
  }

  async getConfiguration(): Promise<string> {
    const response = await this.client.call('GetConfiguration');
    return response.configurationKey;
  }

  async setConfiguration(key: string, value: any): Promise<any> {
    const response = await this.client.call('ChangeConfiguration', {
      key,
      value,
    });
    return response;
  }

  async startTransaction({
    connectorId,
    idTag,
  }: {
    connectorId: number;
    idTag: string;
  }): Promise<any> {
    const response = await this.client.call('RemoteStartTransaction', {
      connectorId,
      idTag,
    });
    return response;
  }

  async getLocalListVersion(): Promise<number> {
    const response = await this.client.call('GetLocalListVersion');
    return parseInt(response.listVersion, 10);
  }
}
