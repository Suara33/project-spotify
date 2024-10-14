import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
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
        return this.playlistRepository.save(playlist)
}
    async findAll(userId:number) {
            const allPlaylist =  await this.playlistRepository
            .createQueryBuilder('playlist')
            .leftJoinAndSelect('playlist.file', 'file')
            .leftJoinAndSelect('playlist.music','music')
            .leftJoin('playlist.user', 'user')
            
            .where('user.id = :userId',{userId})
            .getMany()
 
            return allPlaylist
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


//     async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
        
        
// //         await this.playlistRepository
// //             .createQueryBuilder()
// //             .update(Playlist)
// //             .set({
// //                 name: updatePlaylistDto.name,
        
// //             })
// //             .where('id = :id', { id })
// //             .execute()

// //             const updatedPlaylist = await  this.playlistRepository.findOne({ where: { id}})
// // console.log(updatedPlaylist)
// //             return updatedPlaylist
// return await this.playlistRepository.update(id, updatePlaylistDto)
//     }

    async remove(id: number) {
        return await this.playlistRepository.delete(id)
    }
}
