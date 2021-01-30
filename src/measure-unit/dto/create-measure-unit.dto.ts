import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeasureUnitDto {

  @ApiProperty({​​​
    required: true,
    description: 'Measure Code',
    default: 'kg',
    }​​​​)
  @IsNotEmpty()
  code: string;

  @ApiProperty({​​​
    required: false,
    description: 'Measure description',
    default: 'Kilogrammi',
    }​​​​)
  description?: string;
}
