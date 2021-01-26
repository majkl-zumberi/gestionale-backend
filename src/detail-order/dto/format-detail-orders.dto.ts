export class FormatDetailOrders {
  static formatOrders(orders: any[]) {
    return {
      order: orders,
      totalOrderPrice: orders.reduce((total, curr) => total + curr.total, 0),
    };
  }
}
