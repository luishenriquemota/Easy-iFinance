import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm"
// import User from "./user.entity"
// import Transaction from ""

@Entity("card")
export class Card {

  @PrimaryColumn("increment")
  readonly id: number

  @Column()
  name: string

  @Column({type: "decimal", precision: 10, scale: 2})
  limit: number

  @Column()
  type: string

  @Column()
  dueDate: Date

  @Column()
  closingDate: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // @ManyToOne(() => User, user => user.cards, {eager: true})
  // card: Card

  // @OneToMany(() => Transaction, transaction => transaction.card)
  // transactions: Transaction[]
  
  // @ManyToMany(() => User, user => user.cards, {eager: true})
  // @JoinTable()
  // users: User[]
  
}