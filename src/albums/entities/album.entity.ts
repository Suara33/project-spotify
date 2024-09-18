import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { Listener } from 'src/listeners/entities/listener.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  artistName: string;

  @ManyToMany(() => MusicEntity, (music) => music.albums)
  @JoinTable({
    name: 'album_music'
  })
  music: MusicEntity[]

  @ManyToMany(() => AuthorEntity, (author) => author.albums)
  @JoinTable({
    name: 'album_author'
  })
  authors: AuthorEntity[];

  @OneToMany(() => Listener, (listener) => listener.album)
  listeners: Listener[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}

