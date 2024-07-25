import { IsNumber } from "class-validator";
import { CreateAlbumDto } from "src/album/dto/create-album.dto";
import { AlbumEntity } from "src/album/entities/album.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    

    @ManyToMany(() => AlbumEntity, (album) => album.music)
    albums: AlbumEntity[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
