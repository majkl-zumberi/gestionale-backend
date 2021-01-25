import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  cardNumber: string;
  @Column()
  cardType: string;
  @Column()
  address: string;
}
