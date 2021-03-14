import { InvoiceMaster } from 'src/invoice-master/entities/invoice-master.entity';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InvoiceTail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  cap: string;

  @Column()
  state: string;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  deliveryWeight: number;

  @Column({ type: 'date' })
  deliveryData: Date;

  @Column()
  paymentMethod: string;

  @Column()
  deliveryPrice: number;

  @Column({ default: 0, type: 'decimal', precision: 9, scale: 2 })
  tailDiscount: number;

  @ManyToOne(() => InvoiceMaster, (master: InvoiceMaster) => master.invoices, {
    onDelete: 'CASCADE',
  })
  master: InvoiceMaster;
}
