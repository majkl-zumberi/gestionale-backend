import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { DetailOrderService } from 'src/detail-order/detail-order.service';
import { DetailOrder } from 'src/detail-order/entities/detail-order.entity';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Order } from 'src/order/entities/order.entity';
import { InvoiceTail } from './entities/invoice-tail.entity';
import { InvoiceTailController } from './invoice-tail.controller';
import { InvoiceTailService } from './invoice-tail.service';

@Module({
  controllers: [InvoiceTailController],
  providers: [InvoiceTailService, InvoiceService, DetailOrderService],
  imports: [
    TypeOrmModule.forFeature([
      InvoiceTail,
      InvoiceMaster,
      Order,
      Invoice,
      DetailOrder,
      Article,
    ]),
  ],
})
export class InvoiceTailModule {}
