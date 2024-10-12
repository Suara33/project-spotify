
import { Role } from "src/auth/roles/roles.enum";
import { Favorite} from "src/favorites/entities/favorite.entity";
import { Listener } from "src/listeners/entities/listener.entity";
import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,  OneToMany, PrimaryGeneratedColumn,  UpdateDateColumn } from "typeorm";
import { isBlockedStatus } from "../isBlockedStatus.enum";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id of the user', example: 1})
    id: number;

    @Column({unique: true})
    @ApiProperty({ description: 'name of the user', example: 'mainstreetcoders@gmail.com'})
    email: string

    @Column()
    password: string;

    @Column({type: 'enum', enum:Role})
    @ApiProperty({ description: 'role of the user', example: Role.User})
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
