import { Module } from '@nestjs/common';
import { InvoiceMasterService } from './invoice-master.service';
import { InvoiceMasterController } from './invoice-master.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMaster } from './entities/invoice-master.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  controllers: [InvoiceMasterController],
  providers: [InvoiceMasterService],
  imports: [TypeOrmModule.forFeature([InvoiceMaster, Customer, Order])]
})
export class InvoiceMasterModule {}
