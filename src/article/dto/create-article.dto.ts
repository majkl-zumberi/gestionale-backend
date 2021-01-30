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
    description: 'Article category',
    default: 'Cibo',
    }​​​​)
  @IsNotEmpty()
  category: string;

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
    description: 'Article expiry',
    default: '2021-01-31',
    }​​​​)
  @IsNotEmpty()
  @IsDateString()
  expiry: Date;

  @ApiProperty({​​​
    required: true,
    description: 'Article number',
    default: '23',
    }​​​​)
  @IsNotEmpty()
  @IsPositive()
  available: number;

  @ApiProperty({​​​
    required: false,
    description: 'Image url',
    default: '',
    }​​​​)
  urlimg?: string;
}
