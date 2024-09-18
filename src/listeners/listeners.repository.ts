
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listener } from './entities/listener.entity';
import { Repository } from 'typeorm';
import { CreateListenerDto } from './dto/create-listener.dto';

@Injectable()
export class ListenersRepository {
  createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Listener)
    private readonly listenersRepository: Repository<Listener>
  ) {}

  async create(data: CreateListenerDto){

    const listener =  this.listenersRepository.create(data)
    listener.musicId = data.musicId
    listener.userId = data.userId
   
    return await this.listenersRepository.save(listener)
    
  }


   async findAll(): Promise<Listener[]> {
    return  await this.listenersRepository.find({ relations: ['user', 'music']});
  }

  async findOne(id: number, options?: { relations: string[]; }): Promise<Listener>{
     const listener = await this.listenersRepository.findOne({where: {id}, relations: ['music', 'user']})
     if(!listener) {
      throw new NotFoundException('Listener Not Found');
     }
     return listener;
  }

  

  async remove(id: number) {
    const listener = await this.findOne(id)
    if(!listener) {
        throw new NotFoundException(`Listner with {id} not found`);
    }
    await this.listenersRepository.delete(listener.id)
  }
}
