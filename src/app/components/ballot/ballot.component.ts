import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {
  booth: Boolean;
  candidates:any[] = [];
  selectedValue: any;
  boothId: any;
  token: any;
  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.token = localStorage.getItem('booth_token');
    if(this.token == null){
      this.router.navigate(['/poll_login']); 
    }else{
      this.authService.getBooth().subscribe(profile => {
        this.booth = profile.user.letVote;
        this.boothId = profile.user.booth_id;
        console.log(this.boothId);
        if(this.booth == true){
          this.userService.getCandidate()
          .subscribe(candidates => {
            this.candidates = candidates;
          });
        }else{
          this.router.navigate(['/vote']); 
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }    
  }

  change(type){
    //console.log(type);
    if(type == null){
      this.selectedValue = null;
    }else{
      this.selectedValue = type.candidate_no;
    }  
    //console.log(this.selectedValue);
  } 

  voteCandidate() {
      var _vote = {
        id: this.selectedValue
      };
      var currentBooth = {
        id: this.boothId
      };

    
      
      this.userService.placeVote(_vote).subscribe(data => {
        //console.log(data);
        if (data.success) {
          //window.alert("Success");
          this.userService.markBooth(currentBooth).subscribe(data => {
            //console.log(data);
            if (!data.success) {
              //window.alert("Success"
              window.alert(data.msg); 
            }
          });
          swal({
            position: 'top-end',
            type: 'success',
            title: 'Your vote has been recorded successfully!',
            showConfirmButton: false,
            timer: 1500
          })
    
        this.router.navigate(['/vote']);  // navigate to the dashboard after login
        } else {
          window.alert(data.msg);
          
          
           
        }
      });
    }
  



  

}
