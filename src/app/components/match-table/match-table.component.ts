import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from 'src/app/interfaces/match';
import { User } from 'src/app/interfaces/user';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.css']
})
export class MatchTableComponent implements OnInit {
  filterSelected: string = 'Todos';
  players!: User[];
  matches!: Match[];
  dataSource: MatTableDataSource<Match>;

  constructor( private _matchService: MatchService, private _userService: UserService) { 
    this.dataSource = new MatTableDataSource<Match>();
  }
  
  
  ngOnInit() {
    this.getMatches();
    this.getUsers();
  }

  getMatches(){
    this._matchService.getAll().subscribe((data: Match[]) => {
      this.dataSource.data =  data.map((match: Match) => ({ ...match }));
      this.matches = data;
    });  }


  getUsers(){
    this._userService.getAll().subscribe((data: User[]) => {
      this.players = data;
    });
  }

  applyFilter() {
    if (this.filterSelected !== undefined) {
      this.dataSource.data = this.matches.filter((match: Match) => {
        return [match.playerA1.id, match.playerA2.id, match.playerB1.id, match.playerB2.id].includes(Number(this.filterSelected));
      }).map((match: Match) => ({...match}));
    } else {
      this.dataSource.data =  this.matches.map((match: Match) => ({ ...match }));
    }
  }
  
}
