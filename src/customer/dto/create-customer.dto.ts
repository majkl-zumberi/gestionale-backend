import { IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
  @IsNotEmpty()
  ccode: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  cap: string;

  @IsNotEmpty()
  piva: string;

  @IsNotEmpty()
  phonenr: string;
}
