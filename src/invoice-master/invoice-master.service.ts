import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceMasterDto } from './dto/create-invoice-master.dto';
import { UpdateInvoiceMasterDto } from './dto/update-invoice-master.dto';
import { InvoiceMaster } from './entities/invoice-master.entity';

@Injectable()
export class InvoiceMasterService {
  constructor(
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(
    createInvoiceMasterDto: CreateInvoiceMasterDto,
    id_customer: number,
    id_order: number,
  ) {
    const customer = await this.customerRepository.findOne({ id: id_customer });
    const order = await this.orderRepository.findOne({ id: id_order });
    const newMaster = await this.masterRepository.create({
      ...createInvoiceMasterDto,
      date: new Date(),
      customer: customer,
      order: order,
    });
    await this.masterRepository.save(newMaster);
    return newMaster;
  }

  findAll() {
    return this.masterRepository.find({ relations: ['customer', 'order'] });
  }

  async findOne(id: number) {
    const article = await this.masterRepository.findOne(id, {
      relations: ['customer', 'order'],
    });
    if (article) return article;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `master not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async update(id: number, updateInvoiceMasterDto: UpdateInvoiceMasterDto) {
    await this.masterRepository.update(id, updateInvoiceMasterDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const removeMasterInvoice = await this.masterRepository.findOne(id);
    this.masterRepository.delete(removeMasterInvoice);
  }
}
