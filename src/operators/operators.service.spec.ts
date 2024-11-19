import { Test, TestingModule } from '@nestjs/testing';
import { OperatorsService } from './operators.service';

describe('OperatorsService', () => {
  let service: OperatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperatorsService],
    }).compile();

    service = module.get<OperatorsService>(OperatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
