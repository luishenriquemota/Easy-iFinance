import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./transactions.entity";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./card.entity";

@Entity()

export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string
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