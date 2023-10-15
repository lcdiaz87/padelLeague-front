import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { MatchTableComponent } from './components/match-table/match-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  { path: 'user', component: UserTableComponent },
  { path: 'match', component: MatchTableComponent },
  { path: 'insert-match', component: MatchFormComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
