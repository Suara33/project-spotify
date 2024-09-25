import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { userIdType } from 'aws-sdk/clients/sts';
import { UserHierarchyGroupSearchConditionList } from 'aws-sdk/clients/connect';


@Entity({ })
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column()
  fileId: number;

  @OneToMany(() => FileEntity, (file) =>  file.album)
  file: FileEntity


  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  author: AuthorEntity

  @Column()
  artistName: string;

  @ManyToMany(() => MusicEntity, (music) => music.albums)
  @JoinTable({
    name: 'album_music'
  })
  music: MusicEntity[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}


