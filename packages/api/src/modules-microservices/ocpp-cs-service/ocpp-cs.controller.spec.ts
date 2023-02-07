import { Test, TestingModule } from '@nestjs/testing';
import { OCPPController } from './ocpp-cs.controller';

describe('SubscribeController', () => {
  let controller: OCPPController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OCPPController],
    }).compile();

    controller = module.get<OCPPController>(OCPPController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
