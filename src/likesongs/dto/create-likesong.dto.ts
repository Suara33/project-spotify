import { IsArray, IsInt } from "class-validator";

export class CreateLikesongDto {
    @IsInt()
    trakcId: number;

    @IsInt()
    userId: number;

    @IsArray()
    trackIds: number[]

}
