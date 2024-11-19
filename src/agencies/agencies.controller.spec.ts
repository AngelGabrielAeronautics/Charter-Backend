import { Test, TestingModule } from '@nestjs/testing';
import { AgenciesController } from './agencies.controller';

describe('AgenciesController', () => {
  let controller: AgenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciesController],
    }).compile();

    controller = module.get<AgenciesController>(AgenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
