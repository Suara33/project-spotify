import { IsDate, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Url } from "url";
import { Type } from "class-transformer";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    artist: string;

    @IsDate()
    @Type(() => Date)
    releaseDate: Date;

    @IsString()
    genre: string;

    @IsString()
    track: string;

    @IsUrl()
    coverImage: Url;

    @IsString()
    description: string;




}
