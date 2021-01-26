import { Article } from 'src/article/entities/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class MeasureUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Article, (article: Article) => article.measure)
  articles: Article[];
}
