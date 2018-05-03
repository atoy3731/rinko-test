import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  teams: object[];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.teams = [
      {
        name: 'team1'
      },
      {
        name: 'team2'
      }
    ];
  }

  isAdmin() {
    return false;
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

}
