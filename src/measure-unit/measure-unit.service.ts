import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update(id: number, updateMeasureUnitDto: UpdateMeasureUnitDto) {
    if (!(await this.measureRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `measure unit found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const updateMeasure: MeasureUnit = await this.measureRepository.findOne(id);

    // update each property provided from dto
    Object.keys(updateMeasure).forEach((property) => {
      updateMeasure[property] = updateMeasureUnitDto[property];
    });

    return this.measureRepository.save(updateMeasure);
  }

  async remove(id: number) {
    if (!(await this.measureRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `user not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    this.measureRepository.delete(id);
  }
}
