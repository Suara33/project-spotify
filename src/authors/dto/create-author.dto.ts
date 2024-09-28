import {IsString} from 'class-validator';
export class CreateAuthorDto {

    @IsString()
   fullName: string;

    // @IsArray()
    // musics: MusicEntity[];

    @IsString()
    biography: string;
}


