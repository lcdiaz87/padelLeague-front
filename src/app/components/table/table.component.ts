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
  constructor(private _userService: UserService) { 
    this.dataSource = new MatTableDataSource<User>();
  }
  
  dataSource: MatTableDataSource<User>;
  columns: string[] = ['fullName', 'appName']; 
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getAll().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

}
