import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
   
   @IsEmail()
   @IsNotEmpty()
   @ApiProperty({ example: 'some@email.com'})
   email: string;

   @IsStrongPassword()
   @IsString()
   @IsNotEmpty()
   @ApiProperty({ example: 'verySecurePassword'})
   password: string;

   
}