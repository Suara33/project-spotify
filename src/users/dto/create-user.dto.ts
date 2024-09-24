import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
   

   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsStrongPassword()
   @IsString()
   @IsNotEmpty()
   password: string;

   
}