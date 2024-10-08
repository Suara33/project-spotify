import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles/roles.enum';
import { request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if(user.isBlocked === true) {
       throw new ForbiddenException('User is blocked')
    }

    const passwordIsCorrect = await bcrypt.compare(pass, user.password);

    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { 
      sub: user.id,
      userEmail: user.email,
      role: user.role
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async adminLogin(email: string, pass: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const passwordIsCorrect = await bcrypt.compare(pass, user.password);

    if (!passwordIsCorrect) {
        throw new UnauthorizedException('Invalid email or password');
    }

    if (user.role !== Role.Admin) {  
        throw new UnauthorizedException('User is not an admin');
    }

    const payload = { 
        sub: user.id,
        userEmail: user.email,
        role: user.role
    };

    return { access_token: await this.jwtService.signAsync(payload) };
}
}