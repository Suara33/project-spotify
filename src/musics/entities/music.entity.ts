import { IsNumber } from "class-validator";
import { AlbumEntity } from "src/albums/entities/album.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @IsNumber()
    artistid: number;

    @ManyToMany(() => Playlist, playlist => playlist.music)
    playlists: Playlist[]

    @ManyToMany(() => AlbumEntity, (album) => album.music)
    albums: AlbumEntity[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
    static listeners: any;
}

   
