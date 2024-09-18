import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumRepository } from './repository/album.repository';
import { ListenersRepository } from 'src/listeners/listeners.repository';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly listenersRepository: ListenersRepository
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.create(createAlbumDto);
  }

  // async getPopularAlbums(: Promise<CreateAlbumDto[]> {
  //   const listenerCounts = await this.listenersRepository
  //     .createQueryBuilder('listener')
  //     .select('listener.albumId', 'album.Id')
  //     .addSelect('COUNT(listener.id)', 'listenerCount') 
  //     .groupBy('listener.albumId')
  //     .orderBy('listenerCount', 'DESC')
  //     .take(10)
  //     .getMany(); 

   
  //   const popularAlbums = await this.albumRepository.findOneBy({
  //     where: { id: albumIds}
  //   });

  async getPopularAlbums() {
    return await this.albumRepository.topAlbums()
  }

    
  //   return popularAlbums.map((album) => {
  //     const listenerCount = listenerCounts.find((l) => l.albumId === album.id)?.listenerCount || 0;

  //     return {
  //       id: album.id,  
  //       name: album.name,
  //       artistId: album.artistId,
  //       streamCount: listenerCount, 
  //       likeCount: album.likeCount,
  //     };
  //   });
  // }



// import { Injectable } from '@nestjs/common';
// import { CreateAlbumDto } from './dto/create-album.dto';
// import { UpdateAlbumDto } from './dto/update-album.dto';
// import { AlbumRepository } from './repository/album.repository';
// import { ListenersRepository } from 'src/listeners/listeners.repository';
// import { take } from 'rxjs';

// @Injectable()
// export class AlbumService {
//   constructor(private readonly albumRepository: AlbumRepository,
//               private readonly listenersRepository: ListenersRepository
//   ) {}

//   async create(createAlbumDto: CreateAlbumDto) {
//     return await this.albumRepository.create(createAlbumDto);
//   }

//   async getPopularAlbums(limit: number = 10): Promise<CreateAlbumDto[]> {
//     const listenerCounts = await this.listenersRepository
//       .createQueryBuilder('listener')
//       .select('listener.albumId', 'albumId')
//       .addSelect('COUNT(listener.Id)', 'listenerCount')
//       .groupBy('listener.albumId')
//       .orderBy('listenerCount', 'DESC')
//       .take(limit)
//       .getMany()

//     const popularAlbums = await this.albumRepository.findByIds(
//       listenerCounts.map((listener) => listener.albumId)
//     )

//     return popularAlbums.map((album) => {
//       const listenerCount = listenerCounts.find((l) => l.albumId === album.Id)?.listenerCount || 0;

//       return {
//         id: album.Id,
//         name: album.name,
//         artistId: album.artistId,
//         streamCount: listenerCount,
//         likeCount: album.likeCount,

//       }
//     })
//   }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository.update(id, updateAlbumDto);
    return this.albumRepository.findOne(id);
  }

  async remove(id: number) {
    await this.albumRepository.delete(id);
    return { deleted: true };
  }
}
