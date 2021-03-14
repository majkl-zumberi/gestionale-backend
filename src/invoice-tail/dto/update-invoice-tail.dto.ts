export class UpdateInvoiceTailDto {
  city: string;
  address?: string;
  cap?: string;
  state?: string;
  deliveryWeight?: number;
  deliveryData?: Date;
  paymentMethod?: string;
  deliveryPrice?: number;
  tailDiscount?: number;
}
