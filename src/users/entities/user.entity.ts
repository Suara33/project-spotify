
import { Role } from "src/auth/roles/roles.enum";
import { Favorite} from "src/favorites/entities/favorite.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,  OneToMany, PrimaryGeneratedColumn,  UpdateDateColumn } from "typeorm";
import { isBlockedStatus } from "../isBlockedStatus.enum";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string

    @Column()
    password: string;

    @Column({type: 'enum', enum:Role})
    role: Role;

    @Column({ default: false, nullable: true})
    isBlocked: boolean;

    @OneToMany(() => Playlist, playlist =>  playlist.user, {nullable: true})
    playlists: Playlist[]

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[]

    @OneToMany(() => Listener, (listener) => listener.user)
    listeners: Listener[]

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

}
