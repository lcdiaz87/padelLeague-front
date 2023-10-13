import { User } from "./user";

export interface UserWithScore extends User{
    ranking: number;
    score: number;
    rivals: number;
    totalSets: number;
    wonSets: number;
    lostSets: number;
    wonGames: number;
    lostGames: number;
    gameDifference: number;
}
