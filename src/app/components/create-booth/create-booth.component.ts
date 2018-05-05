import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';

import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-booth',
  templateUrl: './create-booth.component.html',
  styleUrls: ['./create-booth.component.css']
})
export class CreateBoothComponent implements OnInit {
  booth_id: String;
  poll_station: String;
  password: String;
  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      booth_id: this.booth_id,
      poll_station: this.poll_station,
      password: this.password
    };
    // required
    if (!this.validateService.validatePollRegister(user)) {
      window.alert('Please fill in all fields');
      return false;
    }
    
    // Register user
    this.authService.registerBooth(user).subscribe(data => {

      if (data.success) {
        
        this.flashMessage.show('Polling Booth is added to the system', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        window.alert(data.msg);
        //this.router.navigate(['/create_booth']);
      }
    });
  }

}
