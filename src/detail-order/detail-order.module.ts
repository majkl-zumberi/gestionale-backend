import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { Order } from 'src/order/entities/order.entity';
import { DetailOrderController } from './detail-order.controller';
import { DetailOrderService } from './detail-order.service';
import { DetailOrder } from './entities/detail-order.entity';

@Module({
  controllers: [DetailOrderController],
  providers: [DetailOrderService],
  imports: [TypeOrmModule.forFeature([Order, Article, DetailOrder])],
  exports: [DetailOrderService],
})
export class DetailOrderModule {}
