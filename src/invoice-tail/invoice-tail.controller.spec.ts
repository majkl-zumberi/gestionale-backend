import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceTailController } from './invoice-tail.controller';
import { InvoiceTailService } from './invoice-tail.service';

describe('InvoiceTailController', () => {
  let controller: InvoiceTailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceTailController],
      providers: [InvoiceTailService],
    }).compile();

    controller = module.get<InvoiceTailController>(InvoiceTailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
