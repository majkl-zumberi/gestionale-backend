import { Customer } from "src/customer/entities/customer.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";
import { AfterLoad, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoiceMaster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'date'})
    date: Date;

    @ManyToOne(() => Customer, (customer: Customer) => customer.masters, {
        onDelete: 'CASCADE',
      })
      customer: Customer;

    @OneToMany(() => Invoice, (invoice: Invoice) => invoice.master)
    invoices: Invoice[];

    // readonly totalprice
  protected nDoc: string;

  @AfterLoad()
  calculateDocNumber = () => {
    //console.log(this.date, this.id);
    this.nDoc = `${new Date(this.date).getFullYear()%100}/`+this.id;
  };
}
