import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent} from './team/team.component';
import {PlayersComponent} from './players/players.component';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
