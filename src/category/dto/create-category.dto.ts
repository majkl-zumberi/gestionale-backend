import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    description: 'Category Code',
    default: 'Frutta',
  })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    required: true,
    description: 'Category Description',
    default: '',
  })
  description?: string;
}
