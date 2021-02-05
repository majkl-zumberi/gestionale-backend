import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceMasterController } from './invoice-master.controller';
import { InvoiceMasterService } from './invoice-master.service';

describe('InvoiceMasterController', () => {
  let controller: InvoiceMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceMasterController],
      providers: [InvoiceMasterService],
    }).compile();

    controller = module.get<InvoiceMasterController>(InvoiceMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
