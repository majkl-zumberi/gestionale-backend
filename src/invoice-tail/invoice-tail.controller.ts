import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInvoiceTailDto } from './dto/create-invoice-tail.dto';
import { UpdateInvoiceTailDto } from './dto/update-invoice-tail.dto';
import { InvoiceTailService } from './invoice-tail.service';

@Controller('invoice-tail')
export class InvoiceTailController {
  constructor(private readonly invoiceTailService: InvoiceTailService) {}

  @Post(':id_master')
  create(
    @Body() createInvoiceTailDto: CreateInvoiceTailDto,
    @Param('id_master') id_master: string,
  ) {
    return this.invoiceTailService.create(createInvoiceTailDto, +id_master);
  }

  @Get()
  findAll() {
    return this.invoiceTailService.findAll();
  }

  @Get(':id_tail/master/:id_master')
  findOne(
    @Param('id_tail') id_tail: string,
    @Param('id_master') id_master: string,
  ) {
    return this.invoiceTailService.findOne(+id_tail, +id_master);
  }

  @Get('/master/:id')
  findInvoiceByOrderMaster(@Param('id') id: string) {
    return this.invoiceTailService.findByMaster(+id);
  }

  @Put(':id_tail')
  update(
    @Param('id_tail') id_tail: string,
    @Body() updateInvoiceTailDto: UpdateInvoiceTailDto,
  ) {
    return this.invoiceTailService.update(+id_tail, updateInvoiceTailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceTailService.remove(+id);
  }
}
