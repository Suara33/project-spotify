import { FileEntity } from "src/files/entities/file.entity";
import { Likesong } from "src/likesongs/entities/likesong.entity";
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

    @OneToMany(() => FileEntity, (file) => file.user)
    files: FileEntity[]

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
