import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-booth',
  templateUrl: './create-booth.component.html',
  styleUrls: ['./create-booth.component.css']
})
export class CreateBoothComponent implements OnInit {
  poll_stations: any[] = [];
  poll: any[] = [];
  booth_id: String;
  poll_station: String;
  password: String;
  constructor(private validateService: ValidateService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getPollStation()
      .subscribe(poll_stations => {
        this.poll_stations = poll_stations;
        for(let i=0; i<this.poll_stations.length; i++){
          if(this.poll_stations[i].assigned == false){
            this.poll.push(poll_stations[i].poll_station);
          }
          
        }
      });
      
  }
      
  
  onRegisterSubmit() {
    const user = {
      booth_id: this.booth_id,
      poll_station: this.poll_station,
      password: this.password
    };
    // required
    if (!this.validateService.validatePollRegister(user)) {
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
    this.authService.registerBooth(user).subscribe(data => {

      if (data.success) {
        
        swal({
          position: 'top',
          type: 'success',
          title: 'successfully added',
          showConfirmButton: false,
          timer: 1500
        });
        this.booth_id = undefined;
        this.poll_station = undefined;
        this.password = undefined;
        this.userService.markPollStation(user).subscribe(data => {
          if (data.success) {
            window.location.reload();    
          }
        })
        
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
