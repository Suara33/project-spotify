import { Injectable } from '@nestjs/common';
import { CreateListenerDto } from './dto/create-listener.dto';
import { ListenersRepository } from './listeners.repository';


@Injectable()
export class ListenersService {
  constructor(private readonly listenersRepository: ListenersRepository) {}
  create(musicId:number,userId:number) {
    return this.listenersRepository.create(musicId,userId);
  }

  findAll() {
    return this.listenersRepository.findAll();
  }

  findOne(id: number) {
    this.listenersRepository.findOne(id)
  }

  delete(id: number) {
    return this.listenersRepository.remove(id);
  }
}
