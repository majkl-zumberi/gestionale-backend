import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MeasureUnitService } from './measure-unit.service';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';

@Controller('measure-unit')
export class MeasureUnitController {
  constructor(private readonly measureUnitService: MeasureUnitService) {}

  @Post()
  create(@Body() createMeasureUnitDto: CreateMeasureUnitDto) {
    return this.measureUnitService.create(createMeasureUnitDto);
  }

  @Get()
  findAll() {
    return this.measureUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measureUnitService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeasureUnitDto: UpdateMeasureUnitDto,
  ) {
    return this.measureUnitService.update(+id, updateMeasureUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measureUnitService.remove(+id);
  }
}
