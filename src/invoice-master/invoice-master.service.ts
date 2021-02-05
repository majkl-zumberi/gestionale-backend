import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
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
  ) {}

  async create(createInvoiceMasterDto: CreateInvoiceMasterDto, id:number) {
    const customer = await this.customerRepository.findOne({ id });
    const newMaster = await this.masterRepository.create({
      ...createInvoiceMasterDto,
      date: new Date(),
      customer: customer,
    });
    await this.masterRepository.save(newMaster);
    return newMaster;
  }

  findAll() {
    return this.masterRepository.find({ relations:['customer'] });
  }

  async findOne(id: number) {
    const article = await this.masterRepository.findOne(id, {
      relations: ['customer'],
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

  update(id: number, updateInvoiceMasterDto: UpdateInvoiceMasterDto) {
    return `This action updates a #${id} invoiceMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceMaster`;
  }
}
