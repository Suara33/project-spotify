import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { CreateMusicDto } from '../dto/create-album.dto';
import { Music} from 'src/musics/entities/music.entity';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;



  @Column()
  artistName: string;

  @ManyToMany(() => Music, (music) => music.albums)
  @JoinTable({
    // name: ''
    
  })
  music: Music[]

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

}