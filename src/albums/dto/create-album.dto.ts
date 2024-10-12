import { IsArray ,IsDate,IsOptional,IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAlbumDto {
    @IsString()
    title: string;

    @Transform(({value})=> new Date(value))
    @IsDate()
    releaseDate: Date;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateMusicDto)
    musics: CreateMusicDto;

    

    

}
