import { AlbumEntity } from 'src/albums/entities/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, OneToMany } from 'typeorm';


@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  biography: string;

  @Column()
  image: string;

  @OneToMany(() => AlbumEntity, (album) => album.author)
  albums: AlbumEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deteledAt: Date;
  
}