import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceTailService } from './invoice-tail.service';
import { CreateInvoiceTailDto } from './dto/create-invoice-tail.dto';
import { UpdateInvoiceTailDto } from './dto/update-invoice-tail.dto';

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

  @Put(':id_tail/master/:id_master')
  update(
    @Param('id_tail') id_tail: string,
    @Body() updateInvoiceTailDto: UpdateInvoiceTailDto,
    @Param('id_master') id_master: string,
  ) {
    return this.invoiceTailService.update(
      +id_tail,
      updateInvoiceTailDto,
      +id_master,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceTailService.remove(+id);
  }
}
