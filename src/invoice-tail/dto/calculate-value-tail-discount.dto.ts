export class CalculateTailDiscountValue {
  static calculate(invoice: any, tailInvoice: any) {
    return {
      ...tailInvoice,
      tailDiscountValue:
        invoice.totalOrderPriceDiscount -
        (Number(tailInvoice.tailDiscount) / 100) *
          invoice.totalOrderPriceDiscount,
    };
  }
}
