import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reg-candidate',
  templateUrl: './reg-candidate.component.html',
  styleUrls: ['./reg-candidate.component.css']
})
export class RegCandidateComponent implements OnInit {
  parties: any[] = [];
  name: String;
  nic: String;
  party: String;
  candidate_no: Number;
  email: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getParty()
      .subscribe(parties => {
        this.parties = parties;
      });
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      nic: this.nic,
      party: this.party,
      candidate_no: this.candidate_no,
      email: this.email
  
    };
    // required
    if (!this.validateService.validateCandidateRegister(user)) {
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {  
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please enter a valid email address',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }  

    // Register user
    this.authService.registerCandidate(user).subscribe(data => {
      if (data.success) {
        console.log(user.nic);
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
        
        // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        // this.router.navigate(['/dashboard']);
      }
    });
  }

}
