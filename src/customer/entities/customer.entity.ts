import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  cardType: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Order, (order: Order) => order.user_id)
  orders: Order[];

  @BeforeInsert()
  hashPassword = () => {
    this.password = bcrypt.hashSync(this.password, 10);
  };
}
