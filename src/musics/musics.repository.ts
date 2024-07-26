import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { MusicEntity } from "./entities/music.entity";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";



@Injectable()
export class MusicsRepository {
    constructor(
        @InjectRepository(MusicEntity)
        private musicsRepository: Repository<MusicEntity>
    ) {}

    async create(data: CreateMusicDto) {
        const newMusic = this.musicsRepository.create(data)
        return await this.musicsRepository.save(newMusic);
    }

    async findAll() {
        return await this.musicsRepository.find();
    }

    async findOne(id: number): Promise<MusicEntity> {
        return await this.musicsRepository.findOneBy({ id });
    }

    async update(id: number, data: UpdateMusicDto) {
        return await this.musicsRepository.update(id, data);
    }

    async remove(id: number) {
        return await this.musicsRepository.softDelete(id)
    }

  async findByName(name: string) {
    return await this.musicsRepository  
        .createQueryBuilder('music')
        .where('music.name Like :name', { name: `%${name}%`})
        .getMany();
  }

} 


