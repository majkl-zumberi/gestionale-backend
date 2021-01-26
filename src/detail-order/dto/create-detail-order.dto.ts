import { IsNotEmpty } from "class-validator";

export class CreateDetailOrderDto {
    @IsNotEmpty()
    quantity: number;
}
