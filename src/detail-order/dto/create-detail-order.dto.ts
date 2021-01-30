import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateDetailOrderDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1, {
    message: 'la minima quantità deve essere almeno 1',
  })
  @Max(9000, {
    message: 'la massima quantità è 9000',
  })
  quantity: number;
}
