import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';

@Module({
  controllers: [ListenersController],
  providers: [ListenersService],
})
export class ListenersModule {}
