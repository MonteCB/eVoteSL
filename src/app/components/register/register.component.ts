import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

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
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please fill all the fields',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      swal({
        position: 'top',
        type: 'warning',
        title: 'Enter a valid email address',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    
    // Register user
    this.authService.registerUser(user).subscribe(data => {

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
        this.email = undefined;
        this.password = undefined;
        this.type = undefined;
        //this.router.navigate(['/dashboard/register']);
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

