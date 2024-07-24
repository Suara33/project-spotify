import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Music } from "./entities/music.entity";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";



@Injectable()
export class MusicsRepository {
    constructor(
        @InjectRepository(Music)
        private musicsRepository: Repository<Music>
    ) {}

    async create(data: CreateMusicDto) {
        const newMusic = this.musicsRepository.create(data)
        return await this.musicsRepository.save(newMusic);
    }

    async findAll() {
        return await this.musicsRepository.find();
    }

    async findOne(id: number): Promise<Music> {
        return await this.musicsRepository.findOneBy({ id });
    }

    async update(id: number, data: UpdateMusicDto) {
        return await this.musicsRepository.update(id, data);
    }

    async remove(id: number) {
        return await this.musicsRepository.softDelete(id)
    }


}
