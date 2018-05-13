import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import {ValidateService} from '../../services/validate.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  username1: String;
  username: String;
  name: String;
  email: String;
  password: String;
  new_password: String;
  c_password: String;
  voter_id: any;

  constructor(private userService: UserService,
              private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.username1 = this.user.username;
        this.email = this.user.email;
        this.name = this.user.name;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  editUser(user){   
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;    
  }

  onUpdate(users){    
      const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        id: users._id  
      };  
      if (!this.validateService.validateUserUpdate(user)) {
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
      // Update user
      this.authService.updateUser(user).subscribe(data => {
        if (data.success) {          
          swal({
            position: 'top',
            type: 'success',
            title: 'successfully updated',
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();          
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

  onChange(){
    
    this.password = undefined;
    this.new_password = undefined;
    this.c_password = undefined ;   
  }

  onChangePassword(users){
    const user = {
      password: this.password,
      new_password: this.new_password,
      c_password: this.c_password,
      id: users._id,
      username: users.username  
    };

    if (!this.validateService.validateChangePwd(user)) {
      
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!this.validateService.validateConfPwd(user)) {
      
      swal({
        position: 'top',
        type: 'warning',
        title: 'Re-Confirm the new password',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    this.authService.authenticateUser(user).subscribe(data => {   // using the auth service to authenticate

      if (data.success) {
        
        this.authService.ChangePassword(user).subscribe(data => {
          if (data.success) {          
            swal({
              position: 'top',
              type: 'success',
              title: 'Password Changed',
              showConfirmButton: false,
              timer: 1500
            });        
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
        
        
        
      } else {
        swal({
          toast: true,
          type:"error",
          title: "Password does not match",
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
      }
    });
  }


}
