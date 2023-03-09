import { Test, TestingModule } from '@nestjs/testing';
import { OccpCsEventsService } from './occp-cs-events.service';

describe('OccpCsEventsService', () => {
  let service: OccpCsEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OccpCsEventsService],
    }).compile();

    service = module.get<OccpCsEventsService>(OccpCsEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
