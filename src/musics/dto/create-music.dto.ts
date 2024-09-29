import { IsNumber, IsOptional, IsString } from "class-validator";
export class CreateMusicDto {

    @IsString()
    trackTitle: string;

    @IsOptional()
    @IsNumber()
    duration?: number;
    
}






