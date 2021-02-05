import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Invoice } from './entities/invoice.entity';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
  imports: [TypeOrmModule.forFeature([Invoice, Order, InvoiceMaster])]
})
export class InvoiceModule {}
