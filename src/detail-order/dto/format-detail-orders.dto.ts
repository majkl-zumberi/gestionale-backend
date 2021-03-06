export class FormatDetailOrders {
  static formatOrders(orders: any[]) {
    return {
      order: orders,
      totalOrderPrice: orders.reduce((total, curr) => total + curr.total, 0),
      totalOrderPriceDiscount: orders.reduce((total, curr) => total + curr.totalDiscount, 0),
      valueOrderPriceDiscount: orders.reduce((total, curr) => total + curr.valueDiscount, 0),
      totalOrderPriceIva: orders.reduce((total, curr) => total + curr.totalIva, 0),
      valueOrderPriceIva: orders.reduce((total, curr) => total + curr.valueIva, 0),
    };
  }
}
