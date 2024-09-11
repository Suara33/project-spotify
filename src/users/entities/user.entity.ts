import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: '' })
    name: string = ''; 

    @Column({  default: '' })
    email: string = ''; 

    @Column({ default: '' })
    password: string = '';

    @OneToMany(() => Playlist, playlist =>  playlist.user)
    playlists?: Playlist[]


    @CreateDateColumn()
    createAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;

    @DeleteDateColumn()
    deleteAt: Date;
    listeners: any;

    @Column()
    roles?: string;

    @Column({unique: true})
    username?: string;
    
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
  }