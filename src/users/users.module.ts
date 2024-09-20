import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { FileEntity } from 'src/files/entities/file.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User,FileEntity])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository,UsersModule]
})
export class UsersModule {}
