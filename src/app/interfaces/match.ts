import { User } from "./user";

export interface Match {
    id?: number;
    datetime: Date;
    playerA1: User;
    playerA2: User;
    playerB1: User;
    playerB2: User;
    scoreA: number;
    scoreB: number;
}
