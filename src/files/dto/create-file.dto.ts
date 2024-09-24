import { IsString } from "class-validator";

export class CreateFileDto {

    

    @IsString()
    name: string;

    // // @IsString()
    // // bucketName: string;

    // // @IsString()
    // // key: string;

    // // @IsString()
    // // url: string;
    
    // @IsString()
    // audioFile: string;

    // @IsString()
    // imgFile: string;



}
