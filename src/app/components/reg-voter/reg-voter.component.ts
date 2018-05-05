import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';

import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reg-voter',
  templateUrl: './reg-voter.component.html',
  styleUrls: ['./reg-voter.component.css']
})
export class RegVoterComponent implements OnInit {
  name: String;
  nic: String;
  district: String;
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      nic: this.nic,
      district: this.district
  
    };
    // required
    if (!this.validateService.validateVoterRegister(user)) {
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }  

    // Register user
    this.authService.registerVoter(user).subscribe(data => {
      if (data.success) {
        swal({
          position: 'top',
          type: 'success',
          title: 'successfully registered',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard']);
      } else {
        swal({
          position: 'top',
          type: 'warning',
          title: data.msg,
          showConfirmButton: false,
          timer: 2500
        });
      }
    });
  }

}


