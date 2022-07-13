import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./transactions.entity";
import { v4 as uuidv4 } from "uuid";

@Entity()

export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @OneToMany(type => Transactions, transactions => transactions.user, { eager:true } )
    transactions: Transactions[]

    constructor(){
        if(!this.id){
            this.id = uuidv4()
        }
    }
}