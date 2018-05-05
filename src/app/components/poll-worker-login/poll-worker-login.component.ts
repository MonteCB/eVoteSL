import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-poll-worker-login',
  templateUrl: './poll-worker-login.component.html',
  styleUrls: ['./poll-worker-login.component.css']
})
export class PollWorkerLoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    // login credentials
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateOperator(user).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        this.authService.storeOperatorData(data.token, data.user);
        
        this.router.navigate(['authenticate']);  // navigate to the dashboard after login
      } else {
        window.alert(data.msg);
        
        this.router.navigate(['login']);    // navigate to the login if no match
      }
    });
  }

  

}
