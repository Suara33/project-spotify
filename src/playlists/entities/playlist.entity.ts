import { FileEntity } from "src/files/entities/file.entity";
import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Playlist {

        @PrimaryGeneratedColumn()  
        id: number;

        @Column()
        name: string;

        @Column()
        userId: number;

        @ManyToOne(() => FileEntity, (file) => file.playlists, {cascade: true})
        file: FileEntity;

        @Column()
        fileUrl: string;

        @Column({ default: 0})
        count: number;

        @ManyToMany(() => MusicEntity, musicEntity => musicEntity.playlists)
        @JoinTable()
        music: MusicEntity[];

        @ManyToOne(() => User, user => user.playlists)
        user: User;
 
        @CreateDateColumn()
        createAt: Date;

        @UpdateDateColumn()
        updateAt: Date;

        @DeleteDateColumn()
        deleteAt: Date;

}

