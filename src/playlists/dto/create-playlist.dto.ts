
import { IsOptional, IsString } from "class-validator"
export class CreatePlaylistDto {

    @IsString()
    name: string;
    
    // @IsOptional()
    // @IsString()
    // userId?: number;

    // @IsString()
    // fileUrl: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // musicIds: number[]

}
