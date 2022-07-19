import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Transactions } from "./transactions.entity"
import { User } from "./user.entity"

@Entity("card")
export class Card {

  @PrimaryGeneratedColumn("increment")
  readonly id: number

  @Column()
  name: string

  @Column({type: "decimal", precision: 10, scale: 2})
  limit: number

  @Column()
  type: string

  @Column()
  dueDate?: Date

  @Column()
  closingDate?: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date  

  @ManyToOne(type => User, users=>users.cards, {eager: true})
  Owner?:User

  @ManyToMany(()=>User)
  @JoinTable()
  allowedUsers:User[]

  @OneToMany(type => Transactions, transactions => transactions.card)
  transactions: Transactions[]

}