import { IsNumber, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    name: string;

    @IsString()
    url: string;

    @IsNumber()
    artistId: number;

    @IsString()
    filePath: string;
    
    @IsNumber()
    duration: number;

    
}






