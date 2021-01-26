import { Test, TestingModule } from '@nestjs/testing';
import { DetailOrderController } from './detail-order.controller';
import { DetailOrderService } from './detail-order.service';

describe('DetailOrderController', () => {
  let controller: DetailOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailOrderController],
      providers: [DetailOrderService],
    }).compile();

    controller = module.get<DetailOrderController>(DetailOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
