import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(id: number) {
    const customer = await this.customerRepository.findOne({ id: id });
    const newOrder = await this.orderRepository.create({
      date: new Date(),
      user_id: customer,
    });
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orderRepository.find({ relations: ['user_id'] });
  }

  async findOne(id: number) {
    const article = await this.orderRepository.findOne(id, {
      relations: ['user_id'],
    });
    if (article) return article;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `order not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updateOrder = await this.findOne(id);

    // update each property provided from dto
    Object.keys(updateOrder).forEach((property) => {
      updateOrder[property] = updateOrderDto[property];
    });

    return await this.orderRepository.save(updateOrder);
  }

  async remove(id: number) {
    const removeOrder = await this.findOne(id);

    this.orderRepository.delete(removeOrder);
  }
}
