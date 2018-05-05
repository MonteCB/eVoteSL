import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-booth-login',
  templateUrl: './booth-login.component.html',
  styleUrls: ['./booth-login.component.css']
})
export class BoothLoginComponent implements OnInit {
  booth_id: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    // login credentials
    const booth = {
      booth_id: this.booth_id,
      password: this.password
    };

    this.authService.authenticateBooth(booth).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        this.authService.storeBoothData(data.token, data.booth);
        this.router.navigate(['vote']);  // navigate to the vote after login
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['booth_login']);    // navigate to the booth login if no match
      }
    });
  }

}
