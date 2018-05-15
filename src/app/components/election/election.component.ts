import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AuthService,
              private router: Router) { 
    this.usertype=JSON.parse(localStorage.getItem("user")).usertype;
    if(this.usertype==="admin"){  
      this.admin=true;
    }else if(this.usertype==="sAdmin"){
      this.sAdmin=true;
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        this.election = data[0].name;
        this.stopped = data[0].stopped;
        this.started = data[0].started;
        this.newElection = data[0].new_election;
        this.releaseResults = data[0].can_release;
      });
  }

  newElections() {
    this.authService.newElections()
      .subscribe(data => {
        if (data.success) {
          window.alert("fdvx");
          this.authService.getAccess()
            .subscribe(data => {
              this.newElection = data[0].new_election;

            });
        }
      })
  }

  startElection() {
    this.authService.startElection()
      .subscribe(data => {
        if (data.success) {
          window.alert("fdvx");
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

  stopElection() {
    
    this.authService.stopElection()
      .subscribe(data => {
        if (data.success) {
          window.alert("fdvx");
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
          window.alert("fdvx");
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

}
