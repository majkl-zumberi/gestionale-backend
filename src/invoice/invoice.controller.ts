import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UpdateDetailOrderDto } from './dto/update-detail-order.dto';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post(':id_order/:id_master')
  create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Param('id_order') id_order: string,
    @Param('id_master') id_master: string,
  ) {
    return this.invoiceService.create(createInvoiceDto, +id_order, +id_master);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }

  @Get('/master/:id')
  findInvoiceByOrderMaster(@Param('id') id: string) {
    return this.invoiceService.findByMaster(+id);
  }
  @Put('/order/:idOrder/article/:idArticle')
  updateInvoiceByOrderMaster(
    @Param('idOrder') idOrder: string,
    @Param('idArticle') idArticle: string,
    @Body() updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    return this.invoiceService.updateByMaster(
      +idOrder,
      +idArticle,
      updateDetailOrderDto,
    );
  }
}
