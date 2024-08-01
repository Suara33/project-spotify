import { IsArray ,IsString} from 'class-validator';
import { MusicEntity } from 'src/musics/entities/music.entity';


export class CreateAuthorDto {
    @IsString()
    title: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    musics: CreateAuthorDto;

    @IsString()
    biography: string;
}


