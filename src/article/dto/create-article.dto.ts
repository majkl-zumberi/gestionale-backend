import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsDate()
  expiry: Date;

  @IsNotEmpty()
  @IsPositive()
  available: number;

  urlimg?: string;
}
