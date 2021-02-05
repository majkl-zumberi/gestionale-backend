/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { MeasureUnitModule } from './measure-unit/measure-unit.module';
import { MeasureUnit } from './measure-unit/entities/measure-unit.entity';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';
import { DetailOrderModule } from './detail-order/detail-order.module';
import { DetailOrder } from './detail-order/entities/detail-order.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { InvoiceMasterModule } from './invoice-master/invoice-master.module';
import { InvoiceMaster } from './invoice-master/entities/invoice-master.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_user,
      password: process.env.DB_password,
      database: 'gestionale',
      entities: [Customer, Order, MeasureUnit, Article, Invoice, DetailOrder, Category, InvoiceMaster],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    OrderModule,
    MeasureUnitModule,
    ArticleModule,
    InvoiceModule,
    DetailOrderModule,
    CategoryModule,
    InvoiceMasterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
