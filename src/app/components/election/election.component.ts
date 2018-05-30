import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  election: any;
  started: Boolean;
  stopped: Boolean;
  releaseResults: Boolean;
  newElection: Boolean;
  usertype:string;
  admin:boolean=false;
  sAdmin:boolean=false;
  show: Boolean;
  name: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { 
    //restrict access only to election commissioner
    this.usertype=JSON.parse(localStorage.getItem("user")).usertype;
    if(this.usertype==="admin"){  
      this.admin=true;
    }else if(this.usertype==="sAdmin"){
      this.sAdmin=true;
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.show = false;
    this.authService.getAccess()
      .subscribe(data => {
        this.election = data[0].name;
        this.stopped = data[0].stopped;
        this.started = data[0].started;
        this.newElection = data[0].new_election;
        this.releaseResults = data[0].can_release;
      });
  }
  //define new election
  newElections() {
    this.authService.newElections()
      .subscribe(data => {
        if (data.success) {
          
          this.authService.getAccess()
            .subscribe(data => {
              this.newElection = data[0].new_election;

            });
        }
      })
  }

  //start defined election
  startElection() {
    this.authService.startElection()
      .subscribe(data => {
        if (data.success) {

          this.authService.getAccess()
            .subscribe(data => {
              this.election = data[0].name;
              this.stopped = data[0].stopped;
              this.started = data[0].started;
              this.newElection = data[0].new_election;
              this.releaseResults = data[0].can_release;
            });
          
          this.userService.resetData()
          .subscribe(data => {
        
          });  
        }
      })
  }


  //stop a started election
  stopElection() {
    
    this.authService.stopElection()
      .subscribe(data => {
        if (data.success) {
         
          this.authService.getAccess()
            .subscribe(data => {
              this.election = data[0].name;
              this.stopped = data[0].stopped;
              this.started = data[0].started;
              this.newElection = data[0].new_election;
              this.releaseResults = data[0].can_release;

            });
        }
      })

  }
  releaseResult() {
    
    this.authService.releaseResult()
      .subscribe(data => {
        if (data.success) {
          
          this.authService.getAccess()
            .subscribe(data => {
              this.election = data[0].name;
              this.stopped = data[0].stopped;
              this.started = data[0].started;
              this.newElection = data[0].new_election;
              this.releaseResults = data[0].can_release;

            });
        }
      })

  }

  checkResult(){
    this.show = !this.show;
  }

  editElection(){
    
    const user = {
      name: this.name
    };
    
    this.userService.editElection(user).subscribe(data => {
      if(data.success){
        swal({


          title: "Done",
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }else{
        
        window.alert(data.msg);
      }
    });

  }

}
