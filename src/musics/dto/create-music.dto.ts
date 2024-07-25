import { IsNumber, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    artistName: string;

    @IsString()
    url: string;

    @IsNumber()
    artistId: number;
    
}






