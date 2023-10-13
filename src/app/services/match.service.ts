import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Match } from '../interfaces/match';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  
  constructor(private http: HttpClient) { }

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
