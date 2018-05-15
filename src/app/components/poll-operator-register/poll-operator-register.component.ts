import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-poll-operator-register',
  templateUrl: './poll-operator-register.component.html',
  styleUrls: ['./poll-operator-register.component.css']
})
export class PollOperatorRegisterComponent implements OnInit {
  name: String;
  username: String;
  poll_station: String;
  password: String;
  
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      poll_station: this.poll_station,
      username: this.username,
      password: this.password,
    };
    // required
    if (!this.validateService.validateOperatorRegister(user)) {
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please fill all the fields',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    
    
    // Register user
    this.authService.registerOperator(user).subscribe(data => {

      if (data.success) {
        
        swal({
          position: 'top',
          type: 'success',
          title: 'successfully registered',
          showConfirmButton: false,
          timer: 1500
        });
        this.name = undefined;
        this.username = undefined;
        this.poll_station = undefined;
        this.password = undefined;
      } else {
        swal({
          position: 'top',
          type: 'warning',
          title: data.msg,
          showConfirmButton: false,
          timer: 1500
        });
        
      }
    });
  }

}
