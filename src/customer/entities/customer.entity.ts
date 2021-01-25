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

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  cardType: string;

  @Column({ nullable: true })
  address: string;
}
