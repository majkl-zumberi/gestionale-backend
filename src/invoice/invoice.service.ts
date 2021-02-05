import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
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
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, id_order: number, id_master: number) {
    const order = await this.orderRepository.findOne({ id: id_order });
    const master = await this.masterRepository.findOne({ id: id_master });
    const newInvoice = await this.invoiceRepository.create({
      ...createInvoiceDto,
      order: order,
      master: master
    });
    return await this.invoiceRepository.save(newInvoice);
  }

  findAll() {
    return this.invoiceRepository.find({ relations: ['order','master'] });
  }

  async findOne(id: number) {
    const article = await this.invoiceRepository.findOne(id, {
      relations: ['order','master'],
    });
    if (article) return article;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `invoice not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    await this.invoiceRepository.update(id, updateInvoiceDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const removeInvoice = await this.findOne(id);

    this.invoiceRepository.delete(removeInvoice);
  }
}
