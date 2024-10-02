import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
        
        @IsString()
        email: string;

        @IsString()
        password: string;

}

export class CreateAdminAuthDto {
        @IsEmail()
        email: string;
    
        @IsString()
        password: string;
    }