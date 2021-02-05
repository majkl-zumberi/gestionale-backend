import { InvoiceMaster } from "src/invoice-master/entities/invoice-master.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Order, (order: Order) => order.invoices)
    order: Order;

    @ManyToOne(() => InvoiceMaster, (master: InvoiceMaster) => master.invoices)
    master: InvoiceMaster;
}
