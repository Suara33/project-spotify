
import { IsArray ,IsNumber,IsNumberString,IsOptional,IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAlbumDto {
    @IsString()
    albumTitle: string;

    @IsNumberString()
    releaseDate: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto;

    @IsString()
    artistName: string;

}
