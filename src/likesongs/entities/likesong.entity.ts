import { Listener } from "src/listeners/entities/listener.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Likesong {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    musicId: number;

    @ManyToOne(() => User, (user) => user.likesongs)
    user: User[];

    @ManyToOne(() => MusicEntity, (musicEntity) => musicEntity.likesongs)
    music: MusicEntity[];

    @ManyToOne(() => Listener, (listener) => listener.likesongs)
    listeners: Listener[]
}
