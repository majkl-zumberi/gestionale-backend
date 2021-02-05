import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { InvoiceMasterService } from './invoice-master.service';
import { CreateInvoiceMasterDto } from './dto/create-invoice-master.dto';
import { UpdateInvoiceMasterDto } from './dto/update-invoice-master.dto';

@Controller('invoice-master')
export class InvoiceMasterController {
  constructor(private readonly invoiceMasterService: InvoiceMasterService) {}

  @Post(':id_customer/:id_order')
  create(@Body() createInvoiceMasterDto: CreateInvoiceMasterDto, @Param('id_customer') id_customer: string, @Param('id_order') id_order: string) {
    return this.invoiceMasterService.create(createInvoiceMasterDto, +id_customer, +id_order);
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
