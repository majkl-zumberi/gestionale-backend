import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ccode: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  /*@Column()
  password: string;*/

  @Column()
  piva: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  cap: string;

  @Column()
  state: string;

  @Column()
  phonenr: string;

  @OneToMany(() => Order, (order: Order) => order.user_id)
  orders: Order[];

  /*@BeforeInsert()
  hashPassword = () => {
    this.password = bcrypt.hashSync(this.password, 10);
  };*/
}
