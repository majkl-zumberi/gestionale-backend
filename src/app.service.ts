import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article/entities/article.entity';
import { Category } from './category/entities/category.entity';
import { Customer } from './customer/entities/customer.entity';
import { InvoiceMaster } from './invoice-master/entities/invoice-master.entity';
import { MeasureUnit } from './measure-unit/entities/measure-unit.entity';
import { Order } from './order/entities/order.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
    @InjectRepository(MeasureUnit)
    private measureRepository: Repository<MeasureUnit>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getCount() {
    const article = await this.articleRepository.count();
    const category = await this.categoryRepository.count();
    const customer = await this.customerRepository.count();
    const master = await this.masterRepository.count();
    const measure = await this.measureRepository.count();
    const order = await this.orderRepository.count();

    return { article, category, customer, master, measure, order };
  }
}
