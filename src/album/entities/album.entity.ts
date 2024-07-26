import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { UpdateAlbumDto } from '../dto/update-album.dto';

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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}

