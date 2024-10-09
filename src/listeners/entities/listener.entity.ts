import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    musicId: number;

    @Column({nullable: true})
    userId: number;

    @CreateDateColumn()
    createAt: Date;
    
    @ManyToOne(() => MusicEntity, (music) => music.listeners)
    music: MusicEntity;


    @ManyToOne(() => User, (user) => user.listeners)
    user: User;
}

