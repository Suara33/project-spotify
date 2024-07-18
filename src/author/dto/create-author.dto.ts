import { IsArray ,IsString} from 'class-validator';


export class CreateAuthorDto {
    @IsString()
    title: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsArray()
    musics: CreateMusicDto[];

    @IsString()
    biography: string;
}


