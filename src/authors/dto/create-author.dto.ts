import {IsString} from 'class-validator';
export class CreateAuthorDto {

    @IsString()
   fullName: string;

    @IsString()
    biography: string;
}


