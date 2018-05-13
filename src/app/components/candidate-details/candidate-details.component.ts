import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  candidates:any[] = [];
  name: String;
  nic: String;
  party: String;
  candidate_no: Number;
  candidate_id: any;
  

  constructor(private userService: UserService,private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getCandidate()
      .subscribe(candidates => {
        this.candidates = candidates;
    });
  }

  deleteCandidate(id) {
    
    if(confirm("Are you sure to delete this candidate?")) {
      var candidates = this.candidates;
      this.userService.deleteCandidate(id).subscribe(data => {
      
        if(data._id == id){
          for (var i = 0; i < candidates.length; i++) {
            if (candidates[i]._id == id) {
              candidates.splice(i, 1);
            }
          }
        }
      })
    }
  }

  editCandidate(candidate){
    
    this.name = candidate.name;
    this.nic = candidate.nic;
    this.party = candidate.party;
    this.candidate_no = candidate.candidate_no;
    this.candidate_id = candidate._id;
  }

  onUpdate(){
    console.log(this.name);
    
      const user = {
        name: this.name,
        nic: this.nic,
        party: this.party,
        candidate_no: this.candidate_no,
        id: this.candidate_id
    
      };
      // required
      if (!this.validateService.validateCandidateUpdate(user)) {
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
     
  
      // Register user
      this.authService.updateCandidate(user).subscribe(data => {
        if (data.success) {
          console.log(user.nic);
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
          
          // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
          // this.router.navigate(['/dashboard']);
        }
      });
    
  }

}
