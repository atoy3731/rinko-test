import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { SharedService } from '../shared.service';
import {DataSource} from '@angular/cdk/collections';
import {Router} from '@angular/router';

import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  dataSource = new TeamsDataSource(this.api);
  displayedColumns = ['name', 'owner', 'rinko_points'];
  divWidth = 0;

  constructor(private api: ApiService, private ss: SharedService, private router: Router) { }

  ngOnInit() {
  }

  selectTeam(id: any) {
    this.router.navigate(['/team']);
    this.ss.selectTeam(id);
  }

}

export class TeamsDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }
  connect(): Observable<Team[]> {
    return this.api.get('teams').map(res => {
        console.log(res);
          return res.map(team => {
            return new Team(
              team.id,
              team.name,
              team.rinko_points,
              team.owner
            );
          });
        });
  }

  disconnect() {}
}

class Team {
  constructor(public id: number,
              public name: string,
              public rinko_points: number,
              public owner: string) {
  }
}
