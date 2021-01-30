import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';
export class CreateCustomerDto {
  @IsNotEmpty()
  ccode: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsPostalCode('IT')
  cap: string;

  @IsNotEmpty()
  piva: string;

  @IsNotEmpty()
  @IsPhoneNumber('IT')
  phonenr: string;
}
