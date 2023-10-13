import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserWithScore } from 'src/app/interfaces/user-with-score';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
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
