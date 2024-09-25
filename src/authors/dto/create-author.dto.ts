import { IsArray ,IsString} from 'class-validator';
import { MusicEntity } from 'src/musics/entities/music.entity';
export class CreateAuthorDto {

    @IsString()
   fullName: string;

    // @IsArray()
    // musics: MusicEntity[];

    @IsString()
    biography: string;
}


