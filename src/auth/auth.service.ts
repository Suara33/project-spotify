import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly repository: Repository<User>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.repository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, roles: string[] = [UserRole.USER]): Promise<any> {
    const userRoles: UserRole[] = roles.map(role => {
      switch (role.toLowerCase()) {
        case 'admin':
          return UserRole.ADMIN;
        case 'user':
          return UserRole.USER;
        default:
          throw new Error(`Invalid role: ${role}`);
      }
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: Partial<User> = {
      username,
      password: hashedPassword,
      roles: userRoles,
    };
    await this.repository.save(newUser);
    return this.login(newUser);
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}