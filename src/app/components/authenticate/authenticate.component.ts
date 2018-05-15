import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  nic: String;
  operator: any;
  access: Boolean;
  initiate: Boolean;
  poll_station: any;
  token: any;
  acc: Boolean;
  
  


  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        if(data[0].started == false){
          
          this.acc = false;
        }else{
          this.acc = true;
        }
    });

    this.initiate = false;
    this.operator = localStorage.getItem('operator');
    this.token = localStorage.getItem('op_token');
    if (this.operator == null || this.token==null) {
      this.access = false;
      this.router.navigate(['/poll_login/poll_worker_login']);
    } else {
      this.poll_station = JSON.parse(localStorage.getItem("operator")).poll_station;
      this.access = true;
    }
  }
  onCheck() {
    this.authService.getAccess()
      .subscribe(data => {
        if(data[0].started == false){
          swal({
           
            type: 'error',
            title: "Election Timed Out!",
            showConfirmButton: false,
            timer: 2500
          })
          this.router.navigate(['/']);
          
        }else if(data[0].started == true){
          const voter = {
            nic: this.nic
      
          };
          this.authService.authenticateVoter(voter).subscribe(data => {   // using the auth service to authenticate

            if (data.success) {
              if (data.msg == "Voter " + this.nic + " is Authenticated Successfully") {
                
                swal({
                  title: data.msg,
                  type: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Mark as voted'
                }).then((result) => {
                  if (result.value) {
                    this.initiateBooth(); // this should execute now
                  }
                })
              }
              else if (data.msg == "Voter " + this.nic + " has already voted") {
                swal({
                  position: 'top-end',
                  type: 'warning',
                  title: data.msg,
                  showConfirmButton: false,
                  timer: 1500
                })
                this.nic = null;
              }
      
      
            } else {
              swal({
      
                type: 'error',
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
              })
              
      
      
            }
          });
        }
    });
    


    
  }

  initiateBooth() {
    this.initiate = true;
  }
  test() {
    this.nic=" ";
  }
  deactivateBooth() {
    var currentPollStation = {
      id: this.poll_station
    };
    var currentVoter = {
      id: this.nic
    };


    this.userService.markBoothActive(currentPollStation).subscribe(data => {
      if(data.success){
        this.userService.markVoter(currentVoter).subscribe(data => {
          if(data.success){
            swal({

    
              title: "Next Voter!",
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            
            window.alert(data.msg);
          }
        });
      }else{
        
        window.alert(data.msg);
      }
      this.nic = null;
    });
    this.initiate = false;
  }
  


}
