import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne,
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
}
