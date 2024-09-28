import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    authorFullName: string;

    

    @IsNumberString()
    artistId: number;

    @IsOptional()
    @IsNumber()
    duration?: number;

    // @IsString()
    // filePath: string;
    
}






