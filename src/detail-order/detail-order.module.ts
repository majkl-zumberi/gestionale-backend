import { Module } from '@nestjs/common';
import { DetailOrderService } from './detail-order.service';
import { DetailOrderController } from './detail-order.controller';
import { Article } from 'src/article/entities/article.entity';
import { DetailOrder } from './entities/detail-order.entity';
import { Order } from 'src/order/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DetailOrderController],
  providers: [DetailOrderService],
  imports: [TypeOrmModule.forFeature([Order, Article, DetailOrder])],
})
export class DetailOrderModule {}
