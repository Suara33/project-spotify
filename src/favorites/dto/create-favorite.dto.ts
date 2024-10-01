import { IsArray, IsInt } from "class-validator";

export class CreateFavoriteDto {
    @IsInt()
    trakcId: number;

    @IsInt()
    userId: number;

    @IsArray()
    trackIds: number[]

}


