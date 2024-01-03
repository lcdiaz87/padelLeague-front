import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable } from 'rxjs';
import { Match } from 'src/app/interfaces/match';
import { User } from 'src/app/interfaces/user';
import { MatchService } from 'src/app/services/match.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-three-matches-form',
  templateUrl: './three-matches-form.component.html',
  styleUrls: ['./three-matches-form.component.css']
})
export class ThreeMatchesFormComponent implements OnInit {
  padelForm: FormGroup;
  players!: User[];

  constructor(private fb: FormBuilder, private _userService: UserService, private _matchService: MatchService, private toastr: ToastrService) {
    this.padelForm = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      time: ['', Validators.required],
      playerA1: ['', Validators.required],
      playerA2: ['', Validators.required],
      playerB1: ['', Validators.required],
      playerB2: ['', Validators.required],
      scoreA1: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreB1: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreA2: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreB2: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreA3: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreB3: [0, [Validators.required, Validators.min(0), Validators.max(7)]]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getAll().subscribe((data: User[]) => {
      this.players = data;
    });
  }

  resetForm(){
    this.padelForm.reset();
    this.padelForm.markAsUntouched();
  }

  submitForm() {
    const datetime: Date = new Date(this.padelForm.value.date)
    datetime.setHours(Number(this.padelForm.value.time.split(':')[0]), Number(this.padelForm.value.time.split(':')[1]), 0);

    // no players duplicated
    const players = [this.padelForm.value.playerA1.id, this.padelForm.value.playerA2.id, this.padelForm.value.playerB1.id, this.padelForm.value.playerB2.id];
    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== 4) {
      this.toastr.error('Hay jugadores repetidos.');
      return;
    }
    
    // Check the scores are differents and one of them is 6
    if (this.padelForm.value.scoreA1 === this.padelForm.value.scoreB1 || this.padelForm.value.scoreA2 === this.padelForm.value.scoreB2 || this.padelForm.value.scoreA3 === this.padelForm.value.scoreB3) {
      this.toastr.error('Puntuaciones iguales.');
      return;
    }
    const match1: Match = {
      datetime,
      playerA1: this.padelForm.value.playerA1,
      playerA2: this.padelForm.value.playerA2,
      scoreA: this.padelForm.value.scoreA1,
      scoreB: this.padelForm.value.scoreB1,
      playerB1: this.padelForm.value.playerB1,
      playerB2: this.padelForm.value.playerB2,
    };
    const match2: Match = {
      datetime,
      playerA1: this.padelForm.value.playerA1,
      playerA2: this.padelForm.value.playerB1,
      scoreA: this.padelForm.value.scoreA2,
      scoreB: this.padelForm.value.scoreB2,
      playerB1: this.padelForm.value.playerA2,
      playerB2: this.padelForm.value.playerB2,
    };

    const match3: Match = {
      datetime,
      playerA1: this.padelForm.value.playerA1,
      playerA2: this.padelForm.value.playerB2,
      scoreA: this.padelForm.value.scoreA3,
      scoreB: this.padelForm.value.scoreB3,
      playerB1: this.padelForm.value.playerB1,
      playerB2: this.padelForm.value.playerA2,
    };

console.log(match1);
console.log(match2);
console.log(match3);
    const match1$: Observable<Match> = this._matchService.createMatch({...match1, datetime});
    const match2$: Observable<Match> = this._matchService.createMatch({...match2, datetime});
    const match3$: Observable<Match> = this._matchService.createMatch({...match3, datetime});
    
    forkJoin({
      match1: match1$,
      match2: match2$,
      match3: match3$,
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success('Creado!');
    }, error: (error: any) => {
      this.toastr.error(error.error.message);
    }
  });
  }
}
