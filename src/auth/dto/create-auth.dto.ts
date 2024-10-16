import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
        
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com',
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'The password of the user',
        example: 'userpassword123',
    })
    password: string;
}
