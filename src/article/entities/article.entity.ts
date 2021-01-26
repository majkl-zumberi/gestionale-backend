import { type } from 'os';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column({type: 'decimal', precision:2})
    price: number;

    @Column({type:'date'})
    expiry: Date;

    @Column()
    available: number;

    @ManyToOne(() => MeasureUnit, (measure: MeasureUnit) => measure.articles)
    measure: MeasureUnit;
}
