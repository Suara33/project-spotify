
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString } from "class-validator"
import { MusicEntity } from "src/musics/entities/music.entity";

export class CreatePlaylistDto {

    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    userId?: number;

    // @IsString()
    // fileUrl: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // musicIds: number[]


}
