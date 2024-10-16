import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
   
   @IsEmail()
   @IsNotEmpty()
   @ApiProperty({ 
     description: 'The email address of the user', 
     example: 'some@email.com' 
   })
   email: string;

   @IsStrongPassword()
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ 
     description: 'A strong password for the user. It should include upper and lower case letters, numbers, and special characters', 
     example: 'verySecurePassword' 
   })
   password: string;

}
