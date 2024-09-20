import { IsNumber } from "class-validator";
export class CreateListenerDto {
    
    @IsNumber()
    musicId: number;

    @IsNumber()
    userId: number;
}
