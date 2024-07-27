import { IsArray ,IsString} from 'class-validator';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';


export class CreateAuthorDto {


    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    musics: CreateMusicDto;

    @IsString()
    biography: string;
}


