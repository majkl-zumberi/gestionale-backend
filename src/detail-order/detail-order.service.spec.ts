import { Test, TestingModule } from '@nestjs/testing';
import { DetailOrderService } from './detail-order.service';

describe('DetailOrderService', () => {
  let service: DetailOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailOrderService],
    }).compile();

    service = module.get<DetailOrderService>(DetailOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
