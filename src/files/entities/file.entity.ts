import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    bucketName: string;

    @Column()
    url: string;

    @Column()
    key: string;

    @ManyToOne(() => User, (user) => user.files)
    user: User
}