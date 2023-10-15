import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserWithScore } from 'src/app/interfaces/user-with-score';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  constructor(private _userService: UserService) { 
    this.dataSource = new MatTableDataSource<UserWithScore>();
  }
  
  dataSource: MatTableDataSource<UserWithScore>;
  
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getAllWithScore().subscribe((data: UserWithScore[]) => {
      this.dataSource.data = data;
    });
  }

}
