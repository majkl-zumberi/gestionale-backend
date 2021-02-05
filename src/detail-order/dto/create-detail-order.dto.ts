import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateDetailOrderDto {

  @ApiProperty({​​​
    required: true,
    description: 'Order quantity',
    default: '1',
    }​​​​)
  @IsNotEmpty()
  @IsInt()
  @Min(1, {
    message: 'la minima quantità deve essere almeno 1',
  })
  @Max(9000, {
    message: 'la massima quantità è 9000',
  })
  quantity: number;

  @ApiProperty({​​​
    required: false,
    description: 'Order iva',
    default: '22',
    }​​​​)
  iva: number;
}
