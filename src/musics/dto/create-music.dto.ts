import { IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";
export class CreateMusicDto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    artistName: string;

    @IsString()
    url: string;

    @IsNumber()
    artistId: number;
    
}






