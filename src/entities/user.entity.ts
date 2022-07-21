import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Card } from "./card.entity";
import { Friendlist } from "./friendlist.entity";
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

  @Column({default:false})
  isActive: Boolean;

  @Column({nullable: true})
  authToken: string;
 
  @OneToMany(type => Card, cards => cards.Owner)
  cards?:Card[]

  @OneToMany(type => Transactions, transactions => transactions.user, {eager: true})
  transactions?: Transactions[]

  @OneToMany( type => Friendlist, friendList => friendList.user, {eager: true})
  @JoinTable()
  friendList: Friendlist[]
}


