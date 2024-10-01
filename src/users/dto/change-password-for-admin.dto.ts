import { IsString, IsStrongPassword } from "class-validator";


export class ChangePasswordDto {

    @IsStrongPassword()
    @IsString()
    newPassword: string;
}