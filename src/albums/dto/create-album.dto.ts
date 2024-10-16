import { IsArray, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  
  @IsString()
  @ApiProperty({
    description: 'The title of the album',
    example: 'Greatest Hits',
  })
  title: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty({
    description: 'The release date of the album in YYYY-MM-DD format',
    example: '2023-10-01',
  })
  releaseDate: Date;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMusicDto)
  @ApiProperty({
    description: 'A list of music tracks associated with the album',
    type: [CreateMusicDto], 
    nullable: true,
    example: [
      {
        title: 'Song 1',
        duration: '3:45',
      },
      {
        title: 'Song 2',
        duration: '4:20',
      },
    ],
  })
  musics: CreateMusicDto[];
}
