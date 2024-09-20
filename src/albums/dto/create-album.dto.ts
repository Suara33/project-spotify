import { IsArray ,IsNumber,IsOptional,IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAlbumDto {
    @IsString()
    title: string;

    // @IsString()
    // releaseDate: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto;

    @IsString()
    artistName: string;

    // @IsString()
    // fileUrl: string;

    // @IsNumber()
    // duration: number;

}
