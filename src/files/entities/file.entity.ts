import { AlbumEntity } from "src/albums/entities/album.entity";
import { AuthorEntity } from "src/authors/entities/author.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'files'})
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

    @OneToOne(() => MusicEntity, (music) => music.file)
    music: MusicEntity;
    

    @ManyToOne(() =>AlbumEntity, (album) => album.file)
    album:AlbumEntity

    @OneToMany(() => AuthorEntity, (author) => author.file)
    authors: AuthorEntity[]
}