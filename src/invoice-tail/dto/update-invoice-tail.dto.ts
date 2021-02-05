import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceTailDto } from './create-invoice-tail.dto';

export class UpdateInvoiceTailDto extends PartialType(CreateInvoiceTailDto) {}
