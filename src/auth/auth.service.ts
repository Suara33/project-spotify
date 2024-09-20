import { Injectable, PayloadTooLargeException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository,
              private readonly jwtService: JwtService
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordIsCorrect = await bcrypt.compare(pass, user.password);

    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { 
      sub: user.id,
      userEmail: user.email,
      role: user.role
      
    }


    return { access_token: await this.jwtService.signAsync(payload)}
  }
}
