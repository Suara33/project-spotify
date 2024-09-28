
import { IsArray ,IsDateString,IsNumber,IsNumberString,IsOptional,IsString, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAlbumDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsNumberString()
    @Matches(/^\d{4}\/\d{2}\/\d{2}$/, { message: 'releaseDate must be in the format YYYY/MM/DD' })
    releaseDate: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto;

    @IsString()
    artistName: string;

}
