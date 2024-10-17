import { MusicEntity } from 'src/musics/entities/music.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity({name: 'author'})
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  biography: string;

  @OneToMany(() => MusicEntity, (music) => music.author,  {nullable: true})
  musics: MusicEntity[]

  @Column({nullable: true})
  totalAlbumsOfAuthor: number;

  @Column({nullable: true})
  totalSongsOfAuthor: number;

  @Column()
  image: string;

  @OneToOne(() => FileEntity, (file) => file.authors)
  file: FileEntity;

  @OneToMany(() => AlbumEntity, (album) => album.author, {nullable: true})
  albums: AlbumEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deteledAt: Date;
  
}