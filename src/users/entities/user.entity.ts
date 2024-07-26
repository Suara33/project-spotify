import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    email: string;

    @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
