import { IsNumber } from "class-validator";
import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Likesong } from "src/likesongs/entities/likesong.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    artistId: number;

    @OneToMany(() => AuthorEntity, (author) => author.musics)
    author: AuthorEntity

    @Column()
    filePath: string;

    @Column('float')
    duration: number;

    @OneToMany(() => Listener, (listener) => listener.music)
    listeners: Listener[]

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlists: Playlist[]

    @ManyToOne(() => Likesong, likesong => likesong.musicId)
    likesongs: Likesong[]

    @ManyToMany(() => AlbumEntity, (album) => album.music)
    albums: AlbumEntity[];

    @OneToMany(() => Listener, (listener) => listener.musicId)
    listeners: Listener[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
