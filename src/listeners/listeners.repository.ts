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

  async create(musicId:number,userId:number){

    const listener =  new Listener()
    listener.musicId = musicId
    listener.userId = userId

   
    return await this.listenersRepository.save(listener)
    
  }


   async findAll(): Promise<Listener[]> {
    return  await this.listenersRepository.find({ relations: ['user', 'music']});
  }

  async findOne(id: number, options?: { relations: string[]; }): Promise<Listener>{
     const listener = await this.listenersRepository.findOne({where: {id}, relations: ['music', 'user']})
     if(!listener) {
      throw new NotFoundException('Listener not found');
     }
     return listener;
  }

  async remove(id: number) { 
    const listener = await this.findOne(id)
    if(!listener) {
        throw new NotFoundException(`Listener  not found`);
    }
    return await this.listenersRepository.delete(listener.id)
  }

  async countListenersForMusic(musicId: number) {
    return await this.listenersRepository.count({ where: { musicId } });
  }
}
