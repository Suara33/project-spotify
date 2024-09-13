import { Role } from "src/auth/role.enum";
import { Likesong } from "src/likesongs/entities/likesong.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, RoleSpecification, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'enum', enum:Role})
    role: Role;

    @OneToMany(() => Playlist, playlist =>  playlist.user)
    playlists: Playlist[]

    @OneToMany(() => Likesong, likesong => likesong.userId)
    likesongs: Likesong[]


    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
    listeners: any;


    
}
