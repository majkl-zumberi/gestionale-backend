import { DetailOrder } from 'src/detail-order/entities/detail-order.entity';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  price: number;

  @Column({ type: 'date' })
  expiry: Date;

  @Column()
  available: number;

  @ManyToOne(() => MeasureUnit, (measure: MeasureUnit) => measure.articles, {
    onDelete: 'CASCADE',
  })
  measure: MeasureUnit;

  @OneToMany(
    () => DetailOrder,
    (detailOrder: DetailOrder) => detailOrder.article,
  )
  detailOrders: DetailOrder[];
}
