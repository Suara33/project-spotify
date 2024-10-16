import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAdminAuthDto {
    @IsEmail()
    @ApiProperty({
        description: 'Email address of the admin',
        example: 'admin@example.com',
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: 'Password for admin authentication',
        example: 'adminpassword',
    })
    password: string;
}
