import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SharedService implements OnInit {
  private subject = new BehaviorSubject<any>({team: null});

  constructor() {
  }

  ngOnInit() {
  }

  selectTeam(id: number) {
    this.subject.next({ team: id});
  }

  getTeamSelectionMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
