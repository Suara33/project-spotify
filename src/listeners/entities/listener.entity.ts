import { AlbumEntity } from "src/albums/entities/album.entity";
import { Likesong } from "src/likesongs/entities/likesong.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    musicId: number;

    @Column()
    userId: number;

    @OneToMany(() => Likesong,(likesong) => likesong.listeners)
    likesongs: Likesong[]


    @ManyToOne(() => AlbumEntity, (album) => album.listeners)
    album: AlbumEntity;
    
    @ManyToOne(() => MusicEntity, (music) => music.listeners)
    music: MusicEntity;

    @ManyToOne(() => User, (user) => user.listeners)
    user: User;
}

