import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listener {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    musicId: number;

    @Column()
    userId: number;

    @CreateDateColumn()
    createAt: Date;
    
    @ManyToOne(() => MusicEntity, (musicEntity) => musicEntity.listeners)
    music: MusicEntity;

    @ManyToOne(() => User, (user) => user.listeners)
    user: User;
}

