import { MusicEntity } from 'src/musics/entities/music.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';




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

  @ManyToOne(() => MusicEntity, (music) => music.author)
  musics: MusicEntity[]

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