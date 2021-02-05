import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceTailDto } from './dto/create-invoice-tail.dto';
import { UpdateInvoiceTailDto } from './dto/update-invoice-tail.dto';
import { InvoiceTail } from './entities/invoice-tail.entity';

@Injectable()
export class InvoiceTailService {
  constructor(
    @InjectRepository(InvoiceTail)
    private orderRepository: Repository<InvoiceTail>,
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
  ){}
  async create(createInvoiceTailDto: CreateInvoiceTailDto, id: number) {
    const master = await this.masterRepository.findOne({ id });
    const newInvoiceTail = this.orderRepository.create({
      ...createInvoiceTailDto,
      master:master
    });
    return this.orderRepository.save(newInvoiceTail);
  }

  findAll() {
    return this.orderRepository.find({ relations: ['master'] });
  }

  async findOne(id: number) {
    const invoiceTail = await this.orderRepository.findOne(id, {
      relations: ['master']
    });
    if (invoiceTail) return invoiceTail;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `invoice tail not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  update(id: number, updateInvoiceTailDto: UpdateInvoiceTailDto) {
    return `This action updates a #${id} invoiceTail`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceTail`;
  }
}
