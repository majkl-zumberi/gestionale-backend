import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Order } from 'src/order/entities/order.entity';
import { InvoiceTail } from './entities/invoice-tail.entity';
import { InvoiceTailController } from './invoice-tail.controller';
import { InvoiceTailService } from './invoice-tail.service';

@Module({
  controllers: [InvoiceTailController],
  providers: [InvoiceTailService],
  imports: [TypeOrmModule.forFeature([InvoiceTail, InvoiceMaster, Order])],
})
export class InvoiceTailModule {}
