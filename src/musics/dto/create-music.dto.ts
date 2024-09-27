import { IsNumberString, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    trackName: string;

    @IsNumberString()
    artistId: number;

    // @IsNumberString()
    // duration: number;

    duration: number

    // @IsString()
    // filePath: string;
    
}






