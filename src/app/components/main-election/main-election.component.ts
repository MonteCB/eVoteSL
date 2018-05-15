import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-election',
  templateUrl: './main-election.component.html',
  styleUrls: ['./main-election.component.css']
})
export class MainElectionComponent implements OnInit {
  access: Boolean;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        if(data[0].started == false){
          swal({
            
            type: 'error',
            title: "Access Denied!",
            text:"An election should be started by the administrators, in order to access here",
            showConfirmButton: false,
            timer: 6000
          })
          this.router.navigate(['/'])
        }
    });
    

  }

}
