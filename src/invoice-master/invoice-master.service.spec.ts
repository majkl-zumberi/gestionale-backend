import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceMasterService } from './invoice-master.service';

describe('InvoiceMasterService', () => {
  let service: InvoiceMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceMasterService],
    }).compile();

    service = module.get<InvoiceMasterService>(InvoiceMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
