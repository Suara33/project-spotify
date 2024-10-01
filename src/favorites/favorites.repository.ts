import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite} from "./entities/favorite.entity";
import { Repository } from "typeorm";
import { CreateFavoriteDto} from "./dto/create-favorite.dto";
import { MusicEntity } from "src/musics/entities/music.entity";
import { UpdateFavoriteDto} from "./dto/update-favorite.dto";

@Injectable()
export class FavoritesRepository {
    constructor(
        @InjectRepository(Favorite)
        private readonly favoritesRepo: Repository<Favorite>) {}

    async create(data: CreateFavoriteDto) {
        const newFavoriteSong = this.favoritesRepo.create(data)

    const arryaOfFavoriteSongs = []

    for(const trackId of data.trackIds) {
        const newFavoriteSong = new MusicEntity()
        newFavoriteSong.id = trackId
        arryaOfFavoriteSongs.push(newFavoriteSong)
    }
        newFavoriteSong.music = arryaOfFavoriteSongs
        
        return await this.favoritesRepo.save(newFavoriteSong)
    }

    async findall() {
        return await this.favoritesRepo.find()
    }

    async findOne(id: number) {
        return await this.favoritesRepo.findOneBy({ id })
    }

    async update(id: number, data: UpdateFavoriteDto) {
        return this.favoritesRepo.update(id, data)
    }

    async remove(id: number) {
        return await this.favoritesRepo.delete(id)
    }
}
