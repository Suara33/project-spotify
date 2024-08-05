import { IsArray ,IsString} from 'class-validator';




export class CreateAuthorDto {


    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    musics: CreateAuthorDto;

    @IsString()
    biography: string;
}


