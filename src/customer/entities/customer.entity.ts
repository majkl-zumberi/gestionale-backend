/* eslint-disable prettier/prettier */
import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
//import * as bcrypt from 'bcrypt';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ccode: string;

  @Column()
  businessName: string;

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

  @OneToMany(
    () => InvoiceMaster,
    (invoiceMaster: InvoiceMaster) => invoiceMaster.customer,
  )
  masters: InvoiceMaster[];

  /*@BeforeInsert()
  hashPassword = () => {
    this.password = bcrypt.hashSync(this.password, 10);
  };*/
}
