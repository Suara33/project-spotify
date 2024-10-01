import { IsOptional, IsString } from 'class-validator';

export class UpdateMusicDto  {
    @IsOptional()
    @IsString()
    trackTitle?: string;
    
}
