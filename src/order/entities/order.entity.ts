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

  @ManyToOne(() => Customer, (user_id: Customer) => user_id.orders)
  user_id: Customer;

  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.order)
  invoices: Invoice[];
}
