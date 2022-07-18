import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("friendlist")
export class Friendlist {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @ManyToOne((type) => User, (user) => user.id)
  user1: User;

  @ManyToOne((type) => User, (user) => user.id)
  user2: User;
}
