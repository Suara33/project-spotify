import { IsNumberString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMusicDto {

    @IsString()
    @ApiProperty({
        description: 'Title of the music track',
        example: 'Shape of You',
    })
    trackTitle: string;

    @IsOptional()
    @ApiProperty({
        description: 'Duration of the track in minutes and seconds (optional)',
        example: '3:45',
        required: false,
    })
    duration?: string;
    
    @IsOptional()
    @IsNumberString()
    @ApiProperty({
        description: 'ID of the album this track belongs to (optional)',
        example: 123,
        required: false,
    })
    albumId: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'URL or path to the track image (optional)',
        example: 'https://example.com/track-image.jpg',
        required: false,
    })
    trackImage?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Full name of the author of the track (optional)',
        example: 'Ed Sheeran',
        required: false,
    })
    authorFullName: string;

}







