import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository, 
    private readonly jwtService: JwtService,  
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if(user) {
      const passwordIsValid = await bcrypt.compare(pass, user.password);

      if (passwordIsValid) {
        const payload = { userId: user.id, userEmail: user.email, role: user.role};
        const jwtToken = await this.jwtService.signAsync(payload);

        return { access_token: jwtToken };
      } else {
        throw new BadRequestException('Password is not correct');
      }

    } else {
      throw new BadRequestException('Email is not correct');
    }
  }
}
