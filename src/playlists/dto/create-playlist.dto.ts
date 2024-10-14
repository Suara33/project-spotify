
import { IsOptional, IsString } from "class-validator"
import { FileEntity } from "src/files/entities/file.entity";
export class CreatePlaylistDto {

    @IsString()
    name: string;

    @IsOptional()
    file: Express.Multer.File;

}
