import { IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateListenerDto {
    
    @IsNumber()
    @ApiProperty({
        description: 'The ID of the music being listened to',
        example: 123,
    })
    musicId: number;

    @IsNumber()
    @ApiProperty({
        description: 'The ID of the user who is listening to the music',
        example: 456,
    })
    userId: number;
}

