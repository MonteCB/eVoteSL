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
  access: Boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        if(data[0].started == false){
          
          this.access = false;
        }else{
          this.access = true;
        }
    });
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
        
        this.router.navigate(['poll_login/authenticate']);  // navigate to the dashboard after login
      } else {
        window.alert(data.msg);
        
        this.router.navigate(['poll_login/poll_worker_login']);    // navigate to the login if no match
      }
    });
  }

  

}
