import { Article } from 'src/article/entities/article.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class DetailOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ default: 22 })
  iva: number;

  @ManyToOne(() => Article, (article: Article) => article.detailOrders, {
    onDelete: 'CASCADE',
  })
  article: Article;

  @ManyToOne(() => Order, (order: Order) => order.detailOrders, {
    onDelete: 'CASCADE',
  })
  order: Order;

  // readonly totalprice
  protected total: number;
  protected totalIva: number;

  @AfterLoad()
  calculateTotalPrice = () => {
    this.total = this.quantity * Number(this.article.price);
    this.totalIva = this.total + (this.iva / 100) * this.total;
  };
}
