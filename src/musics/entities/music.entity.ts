import { IsNumber } from "class-validator";
import { AlbumEntity } from "src/albums/entities/album.entity";
import { Likesong } from "src/likesongs/entities/likesong.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => Listener, (listner) => listner.music)
    listener: Listener[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;


}

   
