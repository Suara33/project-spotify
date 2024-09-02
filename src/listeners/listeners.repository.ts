import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listener } from './entities/listener.entity';
import { Repository } from 'typeorm';
import { CreateListenerDto } from './dto/create-listener.dto';

@Injectable()
export class ListenersRepository {
  constructor(
    @InjectRepository(Listener)
    private readonly listenersRepository: Repository<Listener>
  ) {}

  async create(createListenerDto: CreateListenerDto){

    const listener =  this.listenersRepository.create(createListenerDto)
    listener.musicId = createListenerDto.musicId
    listener.userId = createListenerDto.userId
   
    return await this.listenersRepository.save(listener)
    
  }


   async findAll(): Promise<Listener[]> {
    return  await this.listenersRepository.find({ relations: ['user', 'music']});
  }

  async findOne(id: number, p0: { relations: string[]; }): Promise<Listener>{
     const listener = await this.listenersRepository.findOne({where: {id}, relations: ['music', 'user']})
     if(!listener) {
      throw new NotFoundException('Listener Not Found');
     }
     return listener;
  }

  

  remove(id: number) {
    return this.listenersRepository.delete(id);
  }
}




