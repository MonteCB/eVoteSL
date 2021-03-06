import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import swal from 'sweetalert2';

@Component({
  selector: 'app-booth-login',
  templateUrl: './booth-login.component.html',
  styleUrls: ['./booth-login.component.css']
})
export class BoothLoginComponent implements OnInit {
  booth_id: String;
  password: String;
  access: Boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

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
    const booth = {
      booth_id: this.booth_id,
      password: this.password
    };

    this.authService.authenticateBooth(booth).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        this.authService.storeBoothData(data.token, data.booth);
        swal({
          toast: true,
          type:"success",
          title: 'Logged in successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/poll_login/vote']);  // navigate to the vote after login
      } else {
        swal({
          toast: true,
          type:"error",
          title: data.msg,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/poll_login/booth_login']);    // navigate to the booth login if no match
      }
    });
  }

}
