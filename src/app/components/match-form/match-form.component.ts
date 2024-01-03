import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css'],
})
export class MatchFormComponent implements OnInit {
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
      scoreA: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreB: [0, [Validators.required, Validators.min(0), Validators.max(7)]]
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
    const players = [this.padelForm.value.playerA1.id, this.padelForm.value.playerA2.id, this.padelForm.value.playerB1.id, this.padelForm.value.playerB2.id];
    const uniquePlayers = new Set(players);
    if (uniquePlayers.size !== 4) {
      this.toastr.error('Hay jugadores repetidos.');
      return;
    }
    
    // Check the scores are differents and one of them is 6
    if (this.padelForm.value.scoreA === this.padelForm.value.scoreB) {
      this.toastr.error('Puntuaciones iguales.');
      return;
    }

    this._matchService.createMatch({...this.padelForm.value, datetime}).subscribe({next: () => {
      this.toastr.success('Creado!');
    }, error: error => {
      this.toastr.error(error.error.message);
    }
  });
  }

}
