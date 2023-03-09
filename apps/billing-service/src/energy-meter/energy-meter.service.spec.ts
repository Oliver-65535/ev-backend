import { Test, TestingModule } from '@nestjs/testing';
import { EnergyMeterService } from './energy-meter.service';

describe('EnergyMeterService', () => {
  let service: EnergyMeterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyMeterService],
    }).compile();

    service = module.get<EnergyMeterService>(EnergyMeterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
