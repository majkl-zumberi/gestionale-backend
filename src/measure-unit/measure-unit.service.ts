import { Injectable } from '@nestjs/common';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { MeasureUnit } from './entities/measure-unit.entity';

@Injectable()
export class MeasureUnitService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureRepository: Repository<MeasureUnit>,
  ) {}

  create(createMeasureUnitDto: CreateMeasureUnitDto) {
    return this.measureRepository.save(createMeasureUnitDto);
  }

  findAll() {
    return this.measureRepository.find();
  }

  findOne(id: number) {
    return this.measureRepository.findOne(id);
  }

  update(id: number, updateMeasureUnitDto: UpdateMeasureUnitDto) {
    return `This action updates a #${id} measureUnit`;
  }

  remove(id: number) {
    return `This action removes a #${id} measureUnit`;
  }
}
