import { DetailOrder } from 'src/detail-order/entities/detail-order.entity';
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Customer, (user_id: Customer) => user_id.orders, {
    onDelete: 'CASCADE',
  })
  user_id: Customer;

  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.order)
  invoices: Invoice[];

  @OneToMany(() => DetailOrder, (detailOrder: DetailOrder) => detailOrder.order)
  detailOrders: DetailOrder[];

  @OneToMany(() => InvoiceMaster, (master: InvoiceMaster) => master.order)
  masters: InvoiceMaster[];
}
