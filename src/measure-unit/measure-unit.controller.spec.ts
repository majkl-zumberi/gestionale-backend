import { Test, TestingModule } from '@nestjs/testing';
import { MeasureUnitController } from './measure-unit.controller';
import { MeasureUnitService } from './measure-unit.service';

describe('MeasureUnitController', () => {
  let controller: MeasureUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasureUnitController],
      providers: [MeasureUnitService],
    }).compile();

    controller = module.get<MeasureUnitController>(MeasureUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
