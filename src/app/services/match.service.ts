import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(environment.baseUrl + 'match').pipe(
      map((matches: any) => {
        return matches.map((match: any) => {
          return {
            id: match.id,
            datetime: new Date(match.datetime),
            playerA1: match.playerA1,
            playerA2: match.playerA2,
            playerB1: match.playerB1,
            playerB2: match.playerB2,
            scoreA: match.scoreA,
            scoreB: match.scoreB,
          } as Match;
        }).sort((a: Match, b: Match) => b.datetime.valueOf() - a.datetime.valueOf());
      })
    );
  }

  createMatch(matchToCreate: Match): Observable<any> {
    return this.http.post(environment.baseUrl + 'match', matchToCreate).pipe(map((response: any) => {
      const result: Match = {
        id: response.id,
        datetime: response.datetime,
        playerA1: response.playerA1,
        playerA2: response.playerA2,
        playerB1: response.playerB1,
        playerB2: response.playerB2,
        scoreA: response.scoreA,
        scoreB: response.scoreB,
      };
      return result;
    }),catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    }));  
  }

}
