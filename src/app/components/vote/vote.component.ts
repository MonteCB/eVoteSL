import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  token: any;
  booth: any;
  access: Boolean;
  boothId: any;
  
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('booth_token');
    
    this.booth = JSON.parse(localStorage.getItem("booth"));
    
    if(this.token == null || this.booth==null){
      this.router.navigate(['/poll_login']); 
    }else{
      
      this.authService.getBooth().subscribe(profile => {
        this.boothId = profile.user.booth_id;
        
        if(this.booth.booth_id == this.boothId){
          this.access = true;
        }else{
          this.access = false;
          this.router.navigate(['/poll_login']); 
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }

  }

  vote(){
    this.router.navigate(['/poll_login/ballot'])
  }

  onLogoutClick() {
    this.authService.logoutBooth();
    swal({
      toast: true,
      
      title: "Logged Out",
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    this.router.navigate(['/poll_login']);
    return false;
  }

}
