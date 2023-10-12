import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  padelForm: FormGroup;
  players: string[] = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];

  constructor(private fb: FormBuilder) {
    this.padelForm = this.fb.group({
      playerA1: ['', Validators.required],
      playerA2: ['', Validators.required],
      playerB1: ['', Validators.required],
      playerB2: ['', Validators.required],
      scoreA: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      scoreB: [0, [Validators.required, Validators.min(0), Validators.max(7)]]
    });
  }

  ngOnInit(): void {
  }
}
