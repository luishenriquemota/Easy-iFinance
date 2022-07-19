import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Card } from "./card.entity";
import { Transactions } from "./transactions.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column()
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({default:true})
  isActive: Boolean;
 
  @OneToMany(type => Card, cards => cards.Owner)
  cards?:Card[]

  @OneToMany(type => Transactions, transactions => transactions.user, { eager:true } )
  transactions?: Transactions[]

}


