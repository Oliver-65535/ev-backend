import { Controller, Get, Param } from '@nestjs/common';
import { OCPPService } from './ocpp-cs.service';

@Controller('ocpp')
export class OcppController {
  constructor(private readonly occpService: OCPPService) {}

  @Get('/start')
  start(@Param('id') id: string): Promise<any> {
    return this.occpService.startTransaction('111', 1, '234');
  }

  @Get('/stop')
  stop(): Promise<any> {
    return this.occpService.stopTransaction('111', 1);
  }
}
