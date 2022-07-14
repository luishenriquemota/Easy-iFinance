
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./transactions.entity";
import { User } from "./user.entity";


@Entity()

export class Card{
    @PrimaryGeneratedColumn('increment')
    id:string
    @Column()
    name:string
    @Column()
    limit:number
    @Column()
    due_Date:Date
    @Column()
    closing_Date:Date
    @CreateDateColumn()
    created_at:Date
    @CreateDateColumn()
    updated_at:Date
    @Column()
    type:string
    @ManyToOne(type => User, users=>users.cards, {eager:true})
    Owner:User
    @ManyToMany(()=>User)
    @JoinTable()
    allowedUsers:User[]
    @OneToMany(type => Transactions, transactions => transactions.card, { eager:true } )
    transactions: Transactions[]
}