import { Test, TestingModule } from '@nestjs/testing';
import { QuotationRequestsController } from './quotation-requests.controller';

describe('QuotationRequestsController', () => {
  let controller: QuotationRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotationRequestsController],
    }).compile();

    controller = module.get<QuotationRequestsController>(QuotationRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
