import { IsArray ,IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMusicDto {
    @IsString()
    title: string;

    @IsString()
    duration: string;
}

export class CreateAlbumDto {
    @IsString()
    title: string;

    @IsString()
    releaseDate: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto[];

    @IsString()
    artistName: string;
}
