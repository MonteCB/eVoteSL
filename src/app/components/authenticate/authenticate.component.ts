import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  nic: String;
  operator: any;
  access: Boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.operator = localStorage.getItem('operator');
    if(this.operator==null){
      this.access = false;
      this.router.navigate(['/poll_worker_login']); 
    }else{
      this.access = true;
    }
  }
onCheck() {
    const voter = {
      nic: this.nic
    };

    this.authService.authenticateVoter(voter).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        window.alert(data.msg);
        //this.authService.storeUserData(data.token, data.voter);
        // console.log('skjdvhdkhdkjvh');
        // this.flashMessage.show('You are now logged in', {
        //   cssClass: 'alert-success',
        //   timeout: 5000
        // });
        //this.router.navigate(['dashboard']);  // navigate to the dashboard after login
      } else {
        window.alert(data.msg);
        // this.flashMessage.show(data.msg, {
        //   cssClass: 'alert-danger',
        //   timeout: 5000
        
         
      }
    });
  }


}
