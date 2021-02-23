import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrderService } from 'src/detail-order/detail-order.service';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateDetailOrderDto } from './dto/update-detail-order.dto';
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
    private readonly detailService: DetailOrderService,
  ) {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
    id_order: number,
    id_master: number,
  ) {
    const order = await this.orderRepository.findOne({ id: id_order });
    const master = await this.masterRepository.findOne({ id: id_master });
    const newInvoice = await this.invoiceRepository.create({
      ...createInvoiceDto,
      order: order,
      master: master,
    });
    return await this.invoiceRepository.save(newInvoice);
  }

  findAll() {
    return this.invoiceRepository.find({ relations: ['order', 'master'] });
  }

  async findOne(id: number) {
    const article = await this.invoiceRepository.findOne(id, {
      relations: ['order', 'master'],
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

  async findByMaster(id: number) {
    const master = await this.invoiceRepository.findOne({
      relations: ['master', 'order'],
      where: [
        {
          master: {
            id: id,
          },
        },
      ],
    });
    return await this.detailService.findByOrderId(master.order.id);
  }

  async updateByMaster(
    orderId: number,
    articleId: number,
    updateDetailOrderDto: UpdateDetailOrderDto,
  ) {
    const invoiceBody = await this.invoiceRepository.findOne({
      relations: ['order'],
      where: [
        {
          order: {
            id: orderId,
          },
        },
      ],
    });

    this.detailService.updateByOrderId(
      invoiceBody.order.id,
      articleId,
      updateDetailOrderDto,
    );

    return await this.findOne(invoiceBody.id);
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
