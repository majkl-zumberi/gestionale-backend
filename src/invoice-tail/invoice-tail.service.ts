import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailOrder } from 'src/detail-order/entities/detail-order.entity';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Repository } from 'typeorm';
import { CalculateTailDiscountValue } from './dto/calculate-value-tail-discount.dto';
import { CreateInvoiceTailDto } from './dto/create-invoice-tail.dto';
import { UpdateInvoiceTailDto } from './dto/update-invoice-tail.dto';
import { InvoiceTail } from './entities/invoice-tail.entity';

@Injectable()
export class InvoiceTailService {
  constructor(
    @InjectRepository(DetailOrder)
    private detailRepository: Repository<DetailOrder>,
    @InjectRepository(InvoiceTail)
    private invoiceTailRepository: Repository<InvoiceTail>,
    @InjectRepository(InvoiceMaster)
    private masterRepository: Repository<InvoiceMaster>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    private readonly invoiceService: InvoiceService,
  ) {}
  async create(createInvoiceTailDto: CreateInvoiceTailDto, id: number) {
    const master = await this.masterRepository.findOne({ id });
    const body = this.invoiceService.findByMaster(master.id);
    const newInvoiceTail = this.invoiceTailRepository.create({
      ...createInvoiceTailDto,
      master: master,
    });
    const newInvoice = await this.invoiceTailRepository.save(newInvoiceTail);
    const tailValue = CalculateTailDiscountValue.calculate(body, newInvoice);
    console.log(tailValue);
    return tailValue;
  }

  findAll() {
    return this.invoiceTailRepository.find({ relations: ['master'] });
  }

  async findOne(id_tail: number, id_master: number) {
    const invoiceTail = await this.invoiceTailRepository.findOne(id_tail, {
      relations: ['master'],
    });
    if (invoiceTail) {
      const body = await this.invoiceService.findByMaster(id_master);
      const tailValue = CalculateTailDiscountValue.calculate(body, invoiceTail);
      return tailValue;
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `invoice tail not found for provided id:${id_tail}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async findByMaster(invoiceMasterId: number) {
    const master = await this.invoiceTailRepository.findOne({
      relations: ['master'],
      where: [
        {
          master: {
            id: invoiceMasterId,
          },
        },
      ],
    });
    const body = await this.invoiceService.findByMaster(master.id);
    const tailValue = CalculateTailDiscountValue.calculate(body, master);
    return tailValue;
  }

  async update(id: number, updateInvoiceTailDto: UpdateInvoiceTailDto) {
    return await this.invoiceTailRepository.update(id, updateInvoiceTailDto);
  }

  async remove(id: number) {
    //const removeTail = await this.findOne(id);
    //this.invoiceTailRepository.delete(removeTail);
  }
}
