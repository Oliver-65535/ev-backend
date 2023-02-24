import { Controller, Get, Param } from '@nestjs/common';
import { OCPPService } from './ocpp-cs.service';

@Controller('ocpp')
export class OcppController {
  constructor(private readonly occpService: OCPPService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.occpService.sendTransaction('111', 1, '234');
  }
}
