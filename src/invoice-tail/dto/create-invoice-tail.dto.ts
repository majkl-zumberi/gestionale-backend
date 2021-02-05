import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInvoiceTailDto {

    @ApiProperty({​​​
        required: true,
        description: 'Delivery city',
        default: 'Milano',
    }​​​​)
    @IsNotEmpty()
    city: string;

    @ApiProperty({​​​
        required: false,
        description: 'Delivery address',
        default: 'Via delle fatture 17483290',
    }​​​​)
    address?: string;

    @ApiProperty({​​​
        required: true,
        description: 'Delivery cap',
        default: '22233',
    }​​​​)
    @IsNotEmpty()
    cap: string;

    @ApiProperty({​​​
        required: true,
        description: 'Delivery state',
        default: 'MI',
    }​​​​)
    @IsNotEmpty()
    state: string;

    @ApiProperty({​​​
        required: true,
        description: 'Delivery weight',
        default: '2.3',
    }​​​​)
    @IsNotEmpty()
    deliveryWeight: number;

    @ApiProperty({​​​
        required: true,
        description: 'Delivery payment method',
        default: 'Cash',
    }​​​​)
    @IsNotEmpty()
    paymentMethod: string;

    @ApiProperty({​​​
        required: true,
        description: 'Delivery price',
        default: '100',
    }​​​​)
    @IsNotEmpty()
    deliveryPrice: number;
}
