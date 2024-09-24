import { MusicEntity } from "src/musics/entities/music.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany,ManyToOne,OneToOne,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Playlist {

        @PrimaryGeneratedColumn()  
        id: number;

        @Column()
        name: string;

        @Column()
        description: string;

        @Column()
        userId: number;

        // @OneToOne(() => )

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

