import { Module } from '@nestjs/common';
import { InvoiceTailService } from './invoice-tail.service';
import { InvoiceTailController } from './invoice-tail.controller';
import { InvoiceTail } from './entities/invoice-tail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';

@Module({
  controllers: [InvoiceTailController],
  providers: [InvoiceTailService],
  imports: [TypeOrmModule.forFeature([InvoiceTail, InvoiceMaster])]
})
export class InvoiceTailModule {}
