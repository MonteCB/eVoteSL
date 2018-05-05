import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
      window.alert('Please fill in all fields');
      return false;
    }
    
    
    // Register user
    this.authService.registerOperator(user).subscribe(data => {

      if (data.success) {
        
        window.alert('Poll operator is added to the system');
        this.router.navigate(['/dashboard']);
      } else {
        window.alert(data.msg);
        //this.router.navigate(['/dashboard']);
      }
    });
  }

}
