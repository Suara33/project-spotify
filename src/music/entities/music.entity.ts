import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Music {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    artist: string;

    @Column()
    trackName: string;

    @Column()
    genre: string;

    @Column()
    releaseDate: Date;

    @Column()
    album: string;

    @Column()
    durationSeconds: number;
}
