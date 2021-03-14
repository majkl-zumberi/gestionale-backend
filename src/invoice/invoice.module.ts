import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Invoice } from './entities/invoice.entity';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { DetailOrderService } from 'src/detail-order/detail-order.service';
import { DetailOrderModule } from 'src/detail-order/detail-order.module';
import { DetailOrder } from 'src/detail-order/entities/detail-order.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, DetailOrderService],
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Order,
      InvoiceMaster,
      DetailOrder,
      Article,
    ]),
    DetailOrderModule,
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}
