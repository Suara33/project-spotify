import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'file'})
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    key: string;

    @Column()
    bucketName: string;

    @Column()
    filename: string;

    @OneToMany(() => Playlist, (playlist) => playlist.file)
    playlists: Playlist[]
    

    @OneToOne(() => MusicEntity, (music) => music.file)
    music: MusicEntity;
    

    @OneToOne(() =>AlbumEntity, (album) => album.file)
    album:AlbumEntity

    @OneToOne(() => AuthorEntity, (author) => author.file)
    authors: AuthorEntity

    
}