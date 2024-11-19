import { Test, TestingModule } from '@nestjs/testing';
import { QuotationRequestsService } from './quotation-requests.service';

describe('QuotationRequestsService', () => {
  let service: QuotationRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotationRequestsService],
    }).compile();

    service = module.get<QuotationRequestsService>(QuotationRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
