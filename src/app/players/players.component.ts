import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../shared.service';
import {ApiService} from '../api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  private filterPlayersSubject: Subject<string> = new Subject<string>();

  totalResults: number;
  isLoading: boolean;
  dataSource = new MatTableDataSource();
  displayedColumns = ['name', 'position', 'goals', 'assists', 'rinko_points'];

  constructor(private api: ApiService, public ss: SharedService) {}

  ngOnInit() {
    this.loadPlayers();
  }

  getFilterPlayersObservable() {
    return this.filterPlayersSubject.asObservable().debounceTime(500).distinctUntilChanged();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadPlayers())
      )
      .subscribe();

    this.getFilterPlayersObservable().subscribe(filter => this.loadPlayers(filter));
  }

  filterPlayers(filter: string) {
    console.log(filter);
    this.filterPlayersSubject.next(filter);
  }

  loadPlayers(name?: string) {
    let limit: number;
    let offset: number;

    if (this.paginator.pageSize == null) {
      limit = 25;
    } else {
      limit = this.paginator.pageSize;
    }

    if ((this.paginator.pageIndex == null) || (this.paginator.pageIndex === 0)) {
      offset = 0;
    } else {
      offset = (this.paginator.pageSize * this.paginator.pageIndex);
    }

    const params = {
      limit: limit,
      offset: offset
    };

    if (name) {
      params['name'] = name;
    }

    this.isLoading = true;

    this.api.get('players', params).map(res => {
      this.totalResults = res.total;
      this.isLoading = false;
      return res.players;
    }).subscribe(players => {
      this.dataSource.data = players;
    });
  }
}
