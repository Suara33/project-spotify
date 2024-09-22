import { IsString } from "class-validator";

export class CreateFileDto {
    filename: string;

    @IsString()
    bucketName: string;

    @IsString()
    url: string;

    @IsString()
    key: string;

}
