import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    musicId: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => MusicEntity, musicEntity => musicEntity.favorites)
    music: MusicEntity[];
}
