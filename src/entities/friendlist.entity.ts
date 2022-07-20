import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("friendlist")
export class Friendlist {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user: User;

  @ManyToOne((type) => User, (user) => user.id)
  friend: User;

}