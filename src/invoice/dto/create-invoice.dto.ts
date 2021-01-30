import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  code: string;
}
