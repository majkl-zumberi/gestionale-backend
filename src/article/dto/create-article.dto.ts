import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  expiry: Date;

  @IsNotEmpty()
  available: number;

  urlimg?: string;
}
