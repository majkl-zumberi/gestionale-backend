import { IsDate, IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsDateString()
  expiry: Date;

  @IsNotEmpty()
  @IsPositive()
  available: number;

  urlimg?: string;
}
