import { IsEmail, IsString } from "class-validator";
export class CreateAdminAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}