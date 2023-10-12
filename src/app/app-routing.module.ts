import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchFormComponent } from './components/match-form/match-form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: 'user', component: TableComponent },
  { path: 'match', component: MatchFormComponent },
  { path: '', redirectTo: '/table', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
