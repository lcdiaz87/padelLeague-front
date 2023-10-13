import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { UserWithScore } from '../interfaces/user-with-score';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllWithScore(): Observable<any>{
    return this.http.get(environment.baseUrl + 'user').pipe(map((users: any) => {
      let results: UserWithScore[] = [];

      for(const user of users) {        
        const result: UserWithScore = this.setScores(user);
        result.rivals = this.setRivals(users, user);
        result.score = (result.rivals * 0.25) + result.wonSets;
        results.push(result);
      }
      return results.sort((a, b) => b.score - a.score).map((user: UserWithScore, index: number) => {
        user.ranking = index + 1;
        return user;
      });
    }));

  }

  setScores(user: any): UserWithScore {
    const result: UserWithScore = {
      id: user.id,
      ranking: 0,
      score: 0,
      fullName: user.fullName,
      appName: user.appName,
      rivals: 0,
      totalSets: 0,
      wonSets: 0,
      lostSets: 0,
      wonGames: 0,
      lostGames: 0,
      gameDifference: 0,
    };

    for(const match of [...user.playerA1, ...user.playerA2]) {
        result.wonGames += match.scoreA;
        result.lostGames += match.scoreB;

        if(match.scoreA > match.scoreB) {
          result.wonSets += 1;
        } else if(match.scoreB > match.scoreA) {
          result.lostSets += 1;
        }  
    }

    for(const match of [...user.playerB1, ...user.playerB2]){
      result.wonGames += match.scoreB;
      result.lostGames += match.scoreA;

      if(match.scoreB > match.scoreA) {
        result.wonSets += 1;
      } else if(match.scoreA > match.scoreB) {
        result.lostSets += 1;
      }

    }

    result.totalSets = result.wonSets + result.lostSets;
    result.gameDifference = result.wonGames - result.lostGames;

    return result;
  }

  setRivals(users: any[], currentUser: any): number {
    let rivals = 0;
    const myMatchIds: number[] = [...currentUser.playerA1, ...currentUser.playerA2, ...currentUser.playerB1, ...currentUser.playerB2].map(match => match.id);

    for(const otherUser of users) {
      for(const match of [...otherUser.playerA1, ...otherUser.playerA2, ...otherUser.playerB1, ...otherUser.playerB2]) {
        if(myMatchIds.includes(match.id)) {
          rivals++;
        }
      }
    }
    if(rivals > 0) rivals--;
    return rivals;
  }

  getAll(): Observable<any>{
    return this.http.get(environment.baseUrl + 'user').pipe(map((users: any) => {
      return users.map((user: any) => {
        return {
          id: user.id,
          fullName: user.fullName,
          appName: user.appName,
        } as User; 
      });
    }));
  }
}
