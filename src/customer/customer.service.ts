import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const createCustomer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(createCustomer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      select: [
        'id',
        'name',
        'lastName',
        'email',
        'cardType',
        'cardNumber',
        'address',
      ],
    });
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      select: [
        'id',
        'name',
        'lastName',
        'email',
        'cardType',
        'cardNumber',
        'address',
      ],
      where: [{ id: id }],
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    if (!(await this.customerRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `customer not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const updateCustomer: Customer = await this.customerRepository.findOne(id);

    // update each property provided from dto
    Object.keys(updateCustomerDto).forEach((property) => {
      updateCustomer[property] = updateCustomerDto[property];
    });
    return this.customerRepository.save(updateCustomer);
  }

  async remove(id: number) {
    if (!(await this.customerRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `user not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    this.customerRepository.delete(id);
  }
}
