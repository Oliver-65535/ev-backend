import { Test, TestingModule } from '@nestjs/testing';
import { OccpCsCallServiceTsService } from './occp-cs-call.service.ts.service';

describe('OccpCsCallServiceTsService', () => {
  let service: OccpCsCallServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccpCsCallServiceTsService],
    }).compile();

    service = module.get<OccpCsCallServiceTsService>(OccpCsCallServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
