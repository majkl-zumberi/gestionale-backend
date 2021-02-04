/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';
import { MeasureUnit } from './entities/measure-unit.entity';

@Injectable()
export class MeasureUnitService {
  constructor(
    @InjectRepository(MeasureUnit)
    private measureRepository: Repository<MeasureUnit>,
  ) {}

  create(createMeasureUnitDto: CreateMeasureUnitDto) {
    try{
    return this.measureRepository.save(createMeasureUnitDto);
    }catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `codice ${createMeasureUnitDto.code} già esistente`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `${e}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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

    await this.measureRepository.update(id, updateMeasureUnitDto);
    return this.findOne(id);
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
