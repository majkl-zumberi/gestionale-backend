import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InvoiceTailService } from './invoice-tail.service';
import { CreateInvoiceTailDto } from './dto/create-invoice-tail.dto';
import { UpdateInvoiceTailDto } from './dto/update-invoice-tail.dto';

@Controller('invoice-tail')
export class InvoiceTailController {
  constructor(private readonly invoiceTailService: InvoiceTailService) {}

  @Post(':id_master')
  create(@Body() createInvoiceTailDto: CreateInvoiceTailDto, @Param('id_master') id_master: string) {
    return this.invoiceTailService.create(createInvoiceTailDto, +id_master);
  }

  @Get()
  findAll() {
    return this.invoiceTailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceTailService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInvoiceTailDto: UpdateInvoiceTailDto) {
    return this.invoiceTailService.update(+id, updateInvoiceTailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceTailService.remove(+id);
  }
}
