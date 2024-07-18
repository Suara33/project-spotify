import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateMusicDto } from '../dto/create-author.dto';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('json')
  musics: List<CreateMusicDto>;

  @Column()
  biography: string;
}