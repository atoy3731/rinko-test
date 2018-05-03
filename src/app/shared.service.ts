import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SharedService implements OnInit {
  private subject = new BehaviorSubject<any>({team: null});
  private currentUser: number;

  constructor() {
  }

  ngOnInit() {
  }

  selectTeam(id: number) {
    this.subject.next({ team: id});
  }

  setCurrentUser(id: number) {
    this.currentUser = id;
    console.log('currentUser', this.getCurrentUser());
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getTeamSelectionMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
