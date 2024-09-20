import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class CreateListenerDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    musicId: number;

    @Column()
    userId: number;
    
    @ManyToOne(() => MusicEntity, (music) => music.listeners)
    music: MusicEntity;

    @ManyToOne(() => User, (user) => user.listeners)
    user: User;



}
