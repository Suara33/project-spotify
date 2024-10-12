import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
        
        @IsString()
        @ApiProperty()
        email: string;

        @IsString()
        @ApiProperty()
        password: string;

}