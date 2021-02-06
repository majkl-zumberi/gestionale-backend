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
    private invoiceTailRepository: Repository<InvoiceTail>,
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
  ) {}
  async create(createInvoiceTailDto: CreateInvoiceTailDto, id: number) {
    const master = await this.masterRepository.findOne({ id });
    const newInvoiceTail = this.invoiceTailRepository.create({
      ...createInvoiceTailDto,
      master: master,
    });
    return this.invoiceTailRepository.save(newInvoiceTail);
  }

  findAll() {
    return this.invoiceTailRepository.find({ relations: ['master'] });
  }

  async findOne(id: number) {
    const invoiceTail = await this.invoiceTailRepository.findOne(id, {
      relations: ['master'],
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

  async update(id: number, updateInvoiceTailDto: UpdateInvoiceTailDto) {
    await this.invoiceTailRepository.update(id, updateInvoiceTailDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const removeTail = await this.findOne(id);
    this.invoiceTailRepository.delete(removeTail);
  }
}
