import { Injectable, NotFoundException } from '@nestjs/common';
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

  async countListenersForMusic(musicId: number) {
    return await this.listenersRepository.countListenersForMusic(musicId);
  }

  delete(id: number) {
    return this.listenersRepository.remove(id);
  }
}

const carTempInF = 105;

const userTempInC = 20;

let celcius = (carTempInF - 32) * 5/9


console.log(celcius)

let acOn 
