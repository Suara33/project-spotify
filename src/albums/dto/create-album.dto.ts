import { IsArray ,IsNumber,IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAlbumDto {
    @IsString()
    title: string;

    @IsString()
    releaseDate: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto;

    @IsString()
    artistName: string;

    @IsString()
    filePath: string;

    @IsNumber()
    duration: number;

}
