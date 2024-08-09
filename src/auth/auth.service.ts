import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async login(email: string, pass: string) {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('acces denied');
    }

    const passwordIsCorrect = await bcrypt.compare(pass, user.password);

    if (!passwordIsCorrect) {
      throw new UnauthorizedException('acces denied!');
    }

    const { password, ...res } = user;

    return res;
    
                  
    // if(user) {

    //    if( await bcrypt.compare(createAuthDto.password, use)) {
    //     const {password, ...res} = user
    //     return res
    //    } else {
    //     return 'username or password is not correct'
    //    }
    // }else{
    //     return 'username or password is not correct'
    // }
  }
}
