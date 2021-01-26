import { Module } from '@nestjs/common';
import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitController } from './measure-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasureUnit } from './entities/measure-unit.entity';

@Module({
  controllers: [MeasureUnitController],
  providers: [MeasureUnitService],
  imports: [TypeOrmModule.forFeature([MeasureUnit])],
})
export class MeasureUnitModule {}
