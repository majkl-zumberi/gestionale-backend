import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}
  
  async create(createInvoiceDto: CreateInvoiceDto, id_order:number) {
    const order = await this.orderRepository.findOne({ id: id_order });
    const newInvoice = await this.invoiceRepository.create({
      ...createInvoiceDto,
      order: order,
    });
    return await this.invoiceRepository.save(newInvoice);
  }

  findAll() {
    return this.invoiceRepository.find({relations:['order']});
  }

  async findOne(id: number) {
    const article = await this.invoiceRepository.findOne(id, {relations:['order']});
    if(article)
      return article
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `article not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}