import { FileEntity } from "src/files/entities/file.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Playlist {

        @PrimaryGeneratedColumn()  
        id: number;

        @Column()
        name: string;
       
        @Column()
        image: string;

        @ManyToOne(() => FileEntity, (file) => file.playlists, {cascade: true})
        file: FileEntity;


        @Column({ default: 0, nullable: true})
        count: number;

        @ManyToMany(() => MusicEntity, music => music.playlists, {cascade: true})
        @JoinTable()
        music: MusicEntity[];

        @ManyToOne(() => User, user => user.playlists,{cascade: true, nullable: true})
        user: User;

        @Column({nullable: true})
        userId: number;

 
        @CreateDateColumn()
        createAt: Date;

        @UpdateDateColumn()
        updateAt: Date;

        @DeleteDateColumn()
        deleteAt: Date;

}

