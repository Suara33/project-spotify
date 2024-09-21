
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Likesong } from "./entities/likesong.entity";
import { Repository } from "typeorm";
import { CreateLikesongDto } from "./dto/create-likesong.dto";
import { MusicEntity } from "src/musics/entities/music.entity";
import { UpdateLikesongDto } from "./dto/update-likesong.dto";

@Injectable()
export class likesongsRepository {
    constructor(
        @InjectRepository(Likesong)
        private readonly likesongRepository: Repository<Likesong>) {}

    async create(data: CreateLikesongDto) {
        const newLikeSong = this.likesongRepository.create(data)

    const arryaOfLikeSongs = []

    for(const trackId of data.trackIds) {
        const newMusic = new MusicEntity()
        newMusic.id = trackId
        arryaOfLikeSongs.push(newMusic)
    }
        newLikeSong.music = arryaOfLikeSongs
        
        return await this.likesongRepository.save(newLikeSong)
    }

    async findall() {
        return await this.likesongRepository.find()
    }

    async findOne(id: number) {
        return await this.likesongRepository.findOneBy({ id })
    }

    async update(id: number, data: UpdateLikesongDto) {
        return this.likesongRepository.update(id, data)
    }

    async remove(id: number) {
        return await this.likesongRepository.delete(id)
    }
}
