import { IsArray, IsInt } from "class-validator";

export class CreateFavoriteDto {
    @IsInt()
    trakcId: number;

    @IsInt()
    userId: number;

    @IsArray()
    trackIds: number[]

}
// dto საერთოდ წავშალო

// get da post  კონტროლერში del

