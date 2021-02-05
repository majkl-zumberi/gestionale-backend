import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InvoiceMasterService } from './invoice-master.service';
import { CreateInvoiceMasterDto } from './dto/create-invoice-master.dto';
import { UpdateInvoiceMasterDto } from './dto/update-invoice-master.dto';

@Controller('invoice-master')
export class InvoiceMasterController {
  constructor(private readonly invoiceMasterService: InvoiceMasterService) {}

  @Post(':id')
  create(@Body() createInvoiceMasterDto: CreateInvoiceMasterDto, @Param('id') id: string) {
    return this.invoiceMasterService.create(createInvoiceMasterDto, +id);
  }

  @Get()
  findAll() {
    return this.invoiceMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceMasterService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInvoiceMasterDto: UpdateInvoiceMasterDto) {
    return this.invoiceMasterService.update(+id, updateInvoiceMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceMasterService.remove(+id);
  }
}
