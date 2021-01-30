import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  
  @ApiProperty({​​​
    required: true,
    description: 'Invoice code',
    default: 'A001',
    }​​​​)
  @IsNotEmpty()
  code: string;
}
