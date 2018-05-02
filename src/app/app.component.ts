import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  teams: object[];

  constructor() {}

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

}