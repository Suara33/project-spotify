import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";


@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository <Playlist>
    ) {}

    async create(
        data: CreatePlaylistDto, 
        image: any,
 
    ) {
        const newPlaylist = new Playlist()
        newPlaylist.name = data.name
        newPlaylist.userId = data.userId
        newPlaylist.file = image
        
        return await this.playlistRepository.save(newPlaylist)
    }
    

     findAll(userId:number) {
        return  this.playlistRepository
            .createQueryBuilder('playlist')
            .leftJoinAndSelect('playlist.music','music')
            .leftJoin('playlist.user', 'user')
            .where('user.id = :userId',{userId})
            .getMany()
    }

    async findOne(id: number) {
        const playlist =  await this.playlistRepository.findOneBy({id});
        if(!playlist) {
            throw new NotFoundException(`playlist with ID ${id} not found`)
        }
        return playlist
    }
    

    async update(id: number, data: UpdatePlaylistDto) {
         await this.playlistRepository.update(id, data)
    }

    async remove(id: number) {
        return await this.playlistRepository.delete(id)
    }
}
