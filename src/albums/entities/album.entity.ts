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

  @ManyToOne(() => AuthorEntity, (author) => author.albums, { onDelete: 'CASCADE' })
  author: AuthorEntity

  @Column()
  coverImage: string;

  @Column()
  count: number;

  @OneToMany(() => MusicEntity, (musics) => musics.album, { cascade: true, onDelete: 'CASCADE' })
  musics: MusicEntity[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}


