import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { MusicEntity } from "src/musics/entities/music.entity";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";


@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository <Playlist>
    ) {}

    async create(data: CreatePlaylistDto) {
        
    const newPlaylist = this.playlistRepository.create(data)

    const arrayOfTracks = [] 

    for(let i = 0 ; i < data.trackIds.length; i++) {
        const newMusic = new MusicEntity()
        newMusic.id = data.trackIds[i]
        arrayOfTracks.push(newMusic)
    }
        newPlaylist.music = arrayOfTracks

       return this.playlistRepository.save(newPlaylist)

    // const newPlaylist = this.playlistRepository.create(data)

    // const arrayOfTracks = []

    // for(const trackId of data.musics) {
    //     const newMusic = new MusicEntity()
    //     newMusic.id = trackId
    //     arrayOfTracks.push(newMusic)
    // }
    //     return this.playlistRepository.save(newPlaylist)
    }

    async findAll() {
        return await this.playlistRepository.find({ relations: {music: true}})
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
