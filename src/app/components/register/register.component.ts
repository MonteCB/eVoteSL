import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  type: String;


  // injecting the services
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      type:this.type
    };
    // required
    if (!this.validateService.validateRegister(user)) {
      window.alert('Please fill in all fields');
      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      window.alert('Please use a valid email');
      //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    // Register user
    this.authService.registerUser(user).subscribe(data => {

      if (data.success) {
        
        window.alert('Secondary admin is added to the system');
        this.router.navigate(['/dashboard']);
      } else {
        window.alert(data.msg);
        //this.router.navigate(['/dashboard']);
      }
    });
  }

}

