import { Controller, Get, Param } from '@nestjs/common';
import { OCPPService } from './ocpp-cs.service';

@Controller('ocpp')
export class OcppController {
  constructor(private readonly occpService: OCPPService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return;
    // return this.occpService.sendTransaction(id, '23');
  }
}
