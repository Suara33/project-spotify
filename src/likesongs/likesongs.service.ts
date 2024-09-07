import { Injectable } from '@nestjs/common';
import { CreateLikesongDto } from './dto/create-likesong.dto';
import { UpdateLikesongDto } from './dto/update-likesong.dto';
import { likesongsRepository } from './likesongs.repository';

@Injectable()
export class LikesongsService {
  constructor(private readonly likesongsRepository: likesongsRepository) {}

  async create(createLikesongDto: CreateLikesongDto) {
    return await this.likesongsRepository.create(createLikesongDto);
  }

  async findAll() {
    return await this.likesongsRepository.findall();
  }

  findOne(id: number) {
    return this.likesongsRepository.findOne(id);
  }

  update(id: number, updateLikesongDto: UpdateLikesongDto) {
    return this.likesongsRepository.update(id, updateLikesongDto);
  }

  delete(id: number) {
    return this.likesongsRepository.remove(id);
  }
}
