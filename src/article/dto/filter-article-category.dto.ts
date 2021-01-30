import { IsNotEmpty, IsString } from 'class-validator';

export class FilterArticleCategory {
  @IsNotEmpty()
  @IsString()
  name: string;
}
