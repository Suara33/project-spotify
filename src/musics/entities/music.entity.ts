import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { FileEntity } from "src/files/entities/file.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,JoinTable,ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Music'})
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    trackTitle: string;

    @Column()
    authorFullName: string;

    @Column({nullable: true})
    trackImage: string;

    @Column({nullable: true})
    authorId: number;

    @ManyToOne(() => AuthorEntity, (author) => author.musics, {nullable: true})
    author: AuthorEntity

    @Column()
    filePath: string;

    @Column({ type: 'varchar', length: 5 ,nullable:true})
    duration: string;

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlists: Playlist[]

    @ManyToOne(() => Favorite, favorite => favorite.musicId)
    favorites: Favorite[]

    @ManyToOne(() => AlbumEntity, (album) => album.musics, {nullable: true})
    album: AlbumEntity;

    @OneToMany(() => Listener, (listener) => listener.music)
    listeners: Listener[]

    @Column({ default: 0 , nullable: true})
    listenerCount: number;

    @OneToOne(() => FileEntity)
    file: FileEntity;


    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
