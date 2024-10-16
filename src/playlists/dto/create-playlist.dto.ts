import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {

    @IsString()
    @ApiProperty({
        description: 'The name of the playlist',
        example: 'My Favorite Tracks',
    })
    name: string;

    @IsOptional()
    @ApiProperty({
        description: 'Optional file to associate with the playlist (such as a cover image)',
        type: 'string',
        format: 'binary',
        required: false,
    })
    file: Express.Multer.File;

}
