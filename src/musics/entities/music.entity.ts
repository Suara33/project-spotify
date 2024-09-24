import { File } from "buffer";
import { IsNumber } from "class-validator";
import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { FileEntity } from "src/files/entities/file.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,JoinColumn,ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity( {name: 'musics'} )
export class MusicEntity {

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

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlists: Playlist[]

    @ManyToOne(() => Favorite, favorite => favorite.musicId)
    favorites: Favorite[]

    @ManyToMany(() => AlbumEntity, (album) => album.music)
    albums: AlbumEntity[];

    @OneToMany(() => Listener, (listener) => listener.musicId)
    listeners: Listener[]

    @OneToOne(() => FileEntity)
    @JoinColumn()
    file: FileEntity;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
