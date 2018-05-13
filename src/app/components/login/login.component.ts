import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  //injecting services to the constructor
  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    // login credentials
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        swal({
          toast: true,
          type:"success",
          title: 'Logged in successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        
        this.router.navigate(['dashboard']);  // navigate to the dashboard after login
      } else {
        swal({
          toast: true,
          type:"error",
          title: data.msg,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['login']);    // navigate to the login if no match
      }
    });
  }

}
