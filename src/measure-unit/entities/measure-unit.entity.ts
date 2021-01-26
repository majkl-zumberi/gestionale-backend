import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class MeasureUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;
}
