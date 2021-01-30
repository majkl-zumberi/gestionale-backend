import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';
export class CreateCustomerDto {

  @ApiProperty({​​​
    required: true,
    description: 'Customer code',
    default: 'A01',
    }​​​​)
  @IsNotEmpty()
  ccode: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer name',
    default: 'Aquila',
    }​​​​)
  @IsNotEmpty()
  name: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer lastname',
    default: 'Ciciretti',
    }​​​​)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer email',
    default: 'ciao@gmail.com',
    }​​​​)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer city',
    default: 'Via Bergamo 1',
    }​​​​)
  @IsNotEmpty()
  address: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer city',
    default: 'Bergamo',
    }​​​​)
  @IsNotEmpty()
  city: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer state',
    default: 'LC',
    }​​​​)
  @IsNotEmpty()
  state: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer cap',
    default: '23874',
    }​​​​)
  @IsNotEmpty()
  @IsPostalCode('IT')
  cap: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer piva',
    default: '2343434325',
    }​​​​)
  @IsNotEmpty()
  piva: string;

  @ApiProperty({​​​
    required: true,
    description: 'Customer phone',
    default: '+393333456987',
    }​​​​)
  @IsNotEmpty()
  @IsPhoneNumber('IT')
  phonenr: string;
}
