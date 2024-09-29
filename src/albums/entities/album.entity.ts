import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 10})
  releaseDate: string;

  @OneToMany(() => FileEntity, (file) =>  file.album)
  file: FileEntity

  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  author: AuthorEntity

  @Column()
  artistName: string;

  @Column()
  coverImage: string;

  @Column()
  count: number;

  @ManyToMany(() => MusicEntity, (musics) => musics.albums, {cascade: true})
  @JoinTable({
    name: 'album_music'
  })
  musics: MusicEntity[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}


