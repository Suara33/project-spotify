import { IsArray ,IsString} from 'class-validator';
import { MusicEntity } from 'src/musics/entities/music.entity';
export class CreateAuthorDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    musics: MusicEntity[];

    @IsString()
    biography: string;
}


