
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { MusicEntity } from "src/musics/entities/music.entity";

export class CreatePlaylistDto {

    @IsString()
    name: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @ArrayNotEmpty()
    @IsArray()
    trackIds: number[];
    
    @IsString()
    userId: number;

    @IsArray()
    @ArrayNotEmpty()
    musicIds: number[]


}
