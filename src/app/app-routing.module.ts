import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchTableComponent } from './components/match-table/match-table.component';
import { ThreeMatchesFormComponent } from './components/three-matches-form/three-matches-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  { path: 'user', component: UserTableComponent },
  { path: 'match', component: MatchTableComponent },
  // { path: 'insert-match', component: MatchFormComponent },
  { path: 'insert-matches', component: ThreeMatchesFormComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
