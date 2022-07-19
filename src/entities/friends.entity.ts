import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("friends")
export class Friends {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({default:true})
  isActive: Boolean;

  @CreateDateColumn()
  created_at: Date;
}