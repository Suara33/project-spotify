import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsIn, isEnum } from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';


export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;


  @ArrayNotEmpty()
  roles: string;
}