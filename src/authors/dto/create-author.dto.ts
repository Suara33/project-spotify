import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from 'src/files/entities/file.entity';

export class CreateAuthorDto {
    
    @IsString()
    @ApiProperty({
        description: 'Full name of the author',
        example: 'John Doe',
    })
    fullName: string;

    @IsString()
    @ApiProperty({
        description: 'Short biography of the author',
        example: 'John Doe is a renowned musician known for his eclectic style and impactful lyrics...',
    })
    biography: string;

}
