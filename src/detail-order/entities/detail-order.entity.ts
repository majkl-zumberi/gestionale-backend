import { Article } from 'src/article/entities/article.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DetailOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Article, (article: Article) => article.detailOrders)
  article: Article;

  @ManyToOne(() => Order, (order: Order) => order.detailOrders)
  order: Order;

  // readonly totalprice
  protected total: number;

  @AfterLoad()
  calculateTotalPrice = () => {
    this.total = this.quantity * Number(this.article.price);
  };
}
