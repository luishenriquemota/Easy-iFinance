import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column()
  friendList_id: Number;

  @Column()
  ownCardList_id: Number;

  @Column()
  allowedCardList_id: Number;
}

// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Transactions } from "./transactions.entity";
// import { v4 as uuidv4 } from "uuid";
// import { Card } from "./card.entity";

// @Entity()

// export class User{
//     @PrimaryGeneratedColumn('uuid')
//     id:string
//     @OneToMany(type => Card, cards => cards.Owner, {eager:true})
//     cards:Card[]
//     @OneToMany(type => Transactions, transactions => transactions.user, { eager:true } )
//     transactions: Transactions[]

//     constructor(){
//         if(!this.id){
//             this.id = uuidv4()
//         }
//     }
// }

