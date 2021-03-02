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

  @Column({ nullable: true})
  note:string;

  @Column({nullable:true, type: 'decimal', precision: 9, scale: 2})
  discount: number;

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
  protected totalDiscount: number;
  protected valueDiscount: number;
  protected totalIva: number;
  protected valueIva: number;

  @AfterLoad()
  calculateTotalPrice = () => {
    this.total = this.quantity * Number(this.article.price);
    this.totalDiscount = this.total - (this.discount/100) * this.total;
    this.valueDiscount = this.total - this.totalDiscount;
    this.totalIva = this.totalDiscount + (this.iva / 100) * this.totalDiscount;
    this.totalIva = Number((Math.round(this.totalIva * 100) / 100).toFixed(2));
    this.valueIva = this.totalIva - this.totalDiscount;
  };
}
