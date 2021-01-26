import { IsNotEmpty } from 'class-validator';

export class CreateMeasureUnitDto {
  @IsNotEmpty()
  code: string;

  description?: string;
}
