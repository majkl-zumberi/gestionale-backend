import { IsNotEmpty } from 'class-validator';
export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  cardNumber?: string;

  cardType?: string;

  address?: string;
}
