import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {
  name: String;
  party_id: String;
  constructor(public validateService: ValidateService,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      party_id: this.party_id
  
    };
    // required
    if (!this.validateService.validatePartyRegister(user)) {
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
    this.authService.registerParty(user).subscribe(data => {
      if (data.success) {
        swal({
          position: 'top',
          type: 'success',
          title: 'successfully registered',
          showConfirmButton: false,
          timer: 1500
        });
        this.name = undefined;
        this.party_id = undefined;
        
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
