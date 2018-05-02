import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {ApiService} from '../api.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {TeamsDataSource} from '../teams/teams.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  subscription: Subscription;
  players: object[];
  team: object;

  dataSource = new TeamPlayersDataSource(this.api);
  displayedColumns = ['name', 'position', 'goals', 'assists', 'rinko_points'];

  constructor(private api: ApiService, public ss: SharedService) {
    this.team = {
      players: []
    };
  }

  ngOnInit() {
    this.subscription = this.ss.getTeamSelectionMessage().subscribe(message => {
      if (message.team != null) {
        this.dataSource.load_players(message.team);
      }
    });
  }

}

export class TeamPlayersDataSource extends DataSource<any> {
  private teamPlayersSubject = new BehaviorSubject<Player[]>([]);
  private loadingTeamPlayersSubject = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService) {
    super();
  }
  connect(): Observable<Player[]> {
    return this.teamPlayersSubject.asObservable();
  }

  load_players(team_id: number) {
    console.log(team_id);
    this.api.get('players', {'team': team_id}).map(res => {
      console.log(res);
      return res.players.map(player => {
        return new Player(
          player.id,
          player.first_name,
          player.last_name,
          'Forward',
          player.goals,
          player.assists,
          player.rinko_points
        );
      });
    }).subscribe(players => this.teamPlayersSubject.next(players));
  }

  disconnect() {}
}

class Player {
  constructor(public id: number,
              public first_name: string,
              public last_name: string,
              public position: string,
              public goals: number,
              public assists: number,
              public rinko_points: number) {
  }
}
