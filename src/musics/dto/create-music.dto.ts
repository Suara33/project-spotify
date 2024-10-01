import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    trackTitle: string;

    @IsOptional()
    @IsNumber()
    duration?: number;
    
    @IsOptional()
    @IsNumberString()
    albumId?: number;
    
    
}






