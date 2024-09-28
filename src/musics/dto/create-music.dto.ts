import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    name: string;

    @IsNumberString()
    artistId: number;

    @IsOptional()
    @IsNumberString()
    duration?: number;

    // @IsString()
    // filePath: string;
    
}






