import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceTailService } from './invoice-tail.service';

describe('InvoiceTailService', () => {
  let service: InvoiceTailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceTailService],
    }).compile();

    service = module.get<InvoiceTailService>(InvoiceTailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
