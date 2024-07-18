import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateMusicDto } from '../dto/create-album.dto';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: string;

  @Column('json')
  musics: CreateMusicDto[];

  @Column()
  artistName: string;
}