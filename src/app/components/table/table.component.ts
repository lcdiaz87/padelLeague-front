import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private _userService: UserService) { }
  
  source = new MatTableDataSource<User>();
  columnas: string[] = ['name', 'surname', 'appName'];  // Nombres de las columnas
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getAll().subscribe((data: User[]) => {
      console.log(data);
      this.source.data = data;
    });
  }

}
