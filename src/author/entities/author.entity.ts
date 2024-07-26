import { CreateMusicDto } from 'src/musics/dto/create-music.dto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type: 'simple-array'})
  musics: CreateMusicDto;

  @Column()
  biography: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deteledAt: Date;
  
}