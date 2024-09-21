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

    async create(
        data: CreatePlaylistDto, 
        file: Express.Multer.File
    ) {


    const newPlaylist = this.playlistRepository.create(data)

    const arrayOfTracks = []

    for(const trackId of data.musicIds) {
        const newMusic = new MusicEntity()
        newMusic.id = trackId
        arrayOfTracks.push(newMusic)
    }

        return await this.playlistRepository.save(newPlaylist)

    newPlaylist.music = arrayOfTracks
    if (file) {
       
    }

        return this.playlistRepository.save(newPlaylist)
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
