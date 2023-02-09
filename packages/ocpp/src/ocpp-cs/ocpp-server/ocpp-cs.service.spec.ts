import { Test, TestingModule } from '@nestjs/testing';

import { OCPPService } from './ocpp-cs.service';

describe('OCPPService', () => {
  let service: OCPPService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OCPPService],
    }).compile();

    service = module.get<OCPPService>(OCPPService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
