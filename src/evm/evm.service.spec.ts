import { Test, TestingModule } from '@nestjs/testing';
import { EvmService } from './evm.service';

describe('EvmService', () => {
  let service: EvmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvmService],
    }).compile();

    service = module.get<EvmService>(EvmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
