import { IsNumber } from "class-validator";
import { CreateAlbumDto } from "src/album/dto/create-album.dto";
import { Album } from "src/album/entities/album.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Music {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @IsNumber()
    artistid: number;

    

    @ManyToMany(() => Album, (album) => album.music)
    albums: Album[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}

   
