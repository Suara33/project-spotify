import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';


@Entity({name: 'album'})
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 10})
  releaseDate: Date;

  @OneToMany(() => FileEntity, (file) =>  file.album)
  file: FileEntity

  @Column()
  authorId: number;

  @ManyToOne(() => AuthorEntity, (author) => author.albums, {nullable: true})
  author: AuthorEntity

  @Column()
  coverImage: string;

  @Column()
  count: number;

  @OneToMany(() => MusicEntity, (musics) => musics.album, {nullable: true})
  musics: MusicEntity[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date; 

}


