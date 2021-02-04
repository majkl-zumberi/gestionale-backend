import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateArticleDto {

  @ApiProperty({​​​
    required: true,
    description: 'Article name',
    default: 'Orange',
    }​​​​)
  @IsNotEmpty()
  name: string;

  @ApiProperty({​​​
    required: true,
    description: 'Article price',
    default: '50',
    }​​​​)
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({​​​
    required: true,
    description: 'Article number',
    default: '23',
    }​​​​)
  @IsNotEmpty()
  @IsPositive()
  available: number;
}
