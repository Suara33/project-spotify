import { Role } from "src/auth/roles/roles.enum";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string

    @Column()
    password: string;

    @Column()
    role: Role;

    @OneToMany(() => Playlist, playlist =>  playlist.user)
    playlists: Playlist[]


    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
    listeners: any;



    
}
