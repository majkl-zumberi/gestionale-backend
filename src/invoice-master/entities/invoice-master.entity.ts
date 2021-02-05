import { Customer } from "src/customer/entities/customer.entity";
import { InvoiceTail } from "src/invoice-tail/entities/invoice-tail.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { Order } from "src/order/entities/order.entity";
import { AfterLoad, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoiceMaster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'date'})
    date: Date;

    @ManyToOne(() => Customer, (customer: Customer) => customer.masters, {
        onDelete: 'CASCADE',
      })
      customer: Customer;
      
    @ManyToOne(() => Order, (order: Order) => order.masters, {
      onDelete: 'CASCADE',
    })
      order: Order;
      
      @OneToMany(() => Invoice, (invoice: Invoice) => invoice.master)
      invoices: Invoice[];

      @OneToMany(() => InvoiceTail, (invoice: InvoiceTail) => invoice.master)
      invoicesTail: InvoiceTail[];

    // readonly totalprice
  protected nDoc: string;

  @AfterLoad()
  calculateDocNumber = () => {
    //console.log(this.date, this.id);
    this.nDoc = `${new Date(this.date).getFullYear()%100}/`+this.id;
  };
}
