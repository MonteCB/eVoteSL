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
  selectedParty: any;
  boothId: any;
  token: any;
  constructor(public userService: UserService,
    public router: Router,
    public authService: AuthService) { }

  ngOnInit() {
    //check whether the booth has the access to the ballot using the both token authentication
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
          this.router.navigate(['/poll_login/vote']); 
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }    
  }

  change(type){
                                      //get the selected candidate
    if(type == null){
      this.selectedValue = null;
    }else{
      this.selectedValue = type.candidate_no;
      this.selectedParty = type.party;

    }  
  } 

  voteCandidate() {       
      var _vote = {
        id: this.selectedValue,
        party: this.selectedParty
      };
      var currentBooth = {
        id: this.boothId
      };

    
      //place the vote
      this.userService.placeVote(_vote).subscribe(data => {       
        if (data.success) {         
          this.userService.markBooth(currentBooth).subscribe(data => {            
            if (!data.success) {
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
    
        this.router.navigate(['/poll_login/vote']);  // navigate to the previous page after placing a vote
        } else {
          window.alert(data.msg);          
        }
      });
    }    
}
