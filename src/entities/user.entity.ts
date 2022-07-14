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
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({default:false})
  isActive: Boolean;
 
  @OneToMany(type => Card, cards => cards.Owner, {eager:true})
  cards:Card[]

  @OneToMany(type => Transactions, transactions => transactions.user, { eager:true } )
  transactions: Transactions[]

  constructor(){
      if(!this.id){
          this.id = uuidv4()
    }
  }
}


