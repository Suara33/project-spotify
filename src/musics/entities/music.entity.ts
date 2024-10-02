import { File } from "buffer";
import { IsNumber } from "class-validator";
import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { FileEntity } from "src/files/entities/file.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,JoinColumn,ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Music'})
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    albumId: number;

    @Column()
    authorName: string;

    @Column({nullable: true})
    authorId: number;

    @ManyToOne(() => AuthorEntity, (author) => author.musics)
    author: AuthorEntity

    @Column()
    filePath: string;

    @Column({ type: 'varchar', length: 5 })
    duration: string;

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlists: Playlist[]

    @ManyToOne(() => Favorite, favorite => favorite.musicId)
    favorites: Favorite[]

    @ManyToMany(() => AlbumEntity, (album) => album.musics)
    albums: AlbumEntity[];

    @OneToMany(() => Listener, (listener) => listener.music)
    listeners: Listener[]

    @OneToOne(() => FileEntity)
    file: FileEntity;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
