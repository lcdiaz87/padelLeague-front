import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {
  padelForm: FormGroup;
  players!: User[];

  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.padelForm = this.fb.group({
      date: ['', Validators.required],
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
      console.log(data);
      this.players = data;
    });
  }

  submitForm() {
    // Aquí puedes añadir la lógica para enviar el formulario
    // Por ejemplo, puedes acceder a los valores del formulario usando this.padelForm.value
    console.log('Formulario enviado:', this.padelForm.value);
  }
}
