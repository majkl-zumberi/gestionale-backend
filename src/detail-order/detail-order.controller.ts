import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DetailOrderService } from './detail-order.service';
import { CreateDetailOrderDto } from './dto/create-detail-order.dto';
import { UpdateDetailOrderDto } from './dto/update-detail-order.dto';

@Controller('detail-order')
export class DetailOrderController {
  constructor(private readonly detailOrderService: DetailOrderService) {}

  @Post(':id_order/:id_article')
  create(
    @Body() createDetailOrderDto: CreateDetailOrderDto,
    @Param('id_article') id_article: string,
    @Param('id_order') id_order: string,
  ) {
    return this.detailOrderService.create(
      createDetailOrderDto,
      +id_order,
      +id_article,
    );
  }

  @Get()
  findAll() {
    return this.detailOrderService.findAll();
  }

  @Get('statistics')
  statistics() {
    return this.detailOrderService.statistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailOrderService.findOne(+id);
  }

  @Get('/order/:id')
  findByOrder(@Param('id') id: string) {
    return this.detailOrderService.findByOrderId(+id);
  }

  @Put('/order/:id_order/article/:id_article')
  updateByOrder(
    @Param('id_order') idOrder: string,
    @Param('id_article') idArticle: string,
    @Body() updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    return this.detailOrderService.updateByOrderId(
      +idOrder,
      +idArticle,
      updateDetailOrderDto,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    return this.detailOrderService.update(+id, updateDetailOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailOrderService.remove(+id);
  }
}
