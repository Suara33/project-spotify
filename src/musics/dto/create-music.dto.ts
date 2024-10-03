import { IsNumberString, IsOptional, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    trackTitle: string;

    @IsOptional()
    duration?: string;
    
    @IsOptional()
    @IsNumberString()
    albumId?: number;
    
    
}






