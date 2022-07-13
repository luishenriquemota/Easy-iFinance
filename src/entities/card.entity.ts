import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./transactions.entity";


@Entity()

export class Card{
    @PrimaryGeneratedColumn()
    id:number
    @OneToMany(type => Transactions, transactions => transactions.card, { eager:true } )
    transactions: Transactions[]
}