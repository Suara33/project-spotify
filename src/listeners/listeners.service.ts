import { Injectable, NotFoundException } from '@nestjs/common';
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
    const listener = this.listenersRepository.findOne(id);
    if (!listener) {
      throw new NotFoundException(`Listener with ID ${id} not found`);
    }
    return listener;
  }

  // totalListenerOftrack(musicId: number, userI)

  delete(id: number) {
    return this.listenersRepository.remove(id);
  }
}
