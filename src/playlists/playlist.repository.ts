import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { ManagedUpload } from "aws-sdk/clients/s3";
import { FileEntity } from "src/files/entities/file.entity";
import { User } from "src/users/entities/user.entity";


@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository <Playlist>
    ) {}

    async create(
        data: CreatePlaylistDto, 
        image: ManagedUpload.SendData,
        user:User
 
    ) {
        const newFile = new FileEntity()
        newFile.bucketName = image.Bucket
        newFile.key = image.Key
        newFile.url = image.Location

        const newPlaylist = new Playlist()
        newPlaylist.name = data.name
        newPlaylist.user = user
        newPlaylist.file = newFile
        newPlaylist.image = newFile.url

        return await this.playlistRepository.save(newPlaylist)

    }
    
    async save(playlist: Playlist) {
        return await this.playlistRepository.save(playlist)
        
}
    async findAll(userId:number) {
         return await this.playlistRepository.find({
            where:{userId},
            relations:['music','user']
        })
            
    }

    async findOne(id: number) {
        const playlist =  await this.playlistRepository.findOne({
            where: {id},
            relations: ['music', 'user']
        });

        
        if(!playlist) {
            throw new NotFoundException(`playlist with ID ${id} not found`)
        }
        return playlist
    }
    async remove(id: number) {
        return await this.playlistRepository.delete(id)
    }
}
