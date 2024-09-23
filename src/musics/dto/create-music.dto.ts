import { IsNumber, IsNumberString, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    name: string;

    @IsString()
    url: string;

    @IsNumberString()
    artistId: number;

    @IsString()
    filePath: string;
    
    @IsNumberString()
    duration: number;

    
}







