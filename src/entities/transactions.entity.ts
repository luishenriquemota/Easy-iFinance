import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Card } from "./card.entity";
import { User } from "./user.entity";


@Entity()

export class Transactions{
    @PrimaryGeneratedColumn('increment')
    readonly transactions_id:string;

    @Column()
    description:string

    @Column('decimal')
    value:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @Column('varchar')
    type:string

    @Column('varchar')
    category:string

    @ManyToOne(type => Card, card=> card.transactions)
    card:Card

    @ManyToOne(type => User, user=> user.transactions)
    user:User
}
