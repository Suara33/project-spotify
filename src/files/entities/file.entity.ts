import { AlbumEntity } from "src/albums/entities/album.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'file'})
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    bucketName: string;

    @Column()
    url: string;

    @Column()
    key: string;

    @ManyToOne(() =>AlbumEntity, (album) => album.file)
    album:AlbumEntity
}