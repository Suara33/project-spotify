import { PartialType } from '@nestjs/mapped-types';
import { CreateLikesongDto } from './create-likesong.dto';

export class UpdateLikesongDto extends PartialType(CreateLikesongDto) {}
