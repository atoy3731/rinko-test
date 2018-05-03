import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../api.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiService, private auth: AuthService, private router: Router, private ss: SharedService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    console.log(values);

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('login', payload, payload).subscribe(data => {
      this.ss.setCurrentUser(data['id']);
      this.auth.setToken(data['token']);
      this.router.navigate(['/teams']);
    });
  }


}
