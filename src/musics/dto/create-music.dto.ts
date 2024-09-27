import { IsNumber, IsNumberString, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    trackName: string;

    @IsNumberString()
    artistId: number;

    
    @IsNumber()
    duration: number;

    // @IsString()
    // filePath: string;
    
}






