import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';



@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.css']
})
export class VoterDetailsComponent implements OnInit {
  voters: any[] = [];
  name: String;
  nic: String;
  district: String;
  voter_id: any;

  constructor(private userService: UserService,
              private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) {
    this.userService.getVoter()
      .subscribe(voters => {
        this.voters = voters;
      });
  }

  ngOnInit() {

  }
  deleteVoter(id) {
    swal({
      title: "Are you sure to remove this voter?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.value) {
        var voters = this.voters;
        this.userService.deleteVoter(id).subscribe(data => {
      
        if(data._id == id){
          for (var i = 0; i < voters.length; i++) {
            if (voters[i]._id == id) {
              voters.splice(i, 1);
            }
          }
        }
      })
      }
      

    })
    
  }

  editVoter(voter){
    
    this.name = voter.name;
    this.nic = voter.nic;
    this.district = voter.district;
    this.voter_id = voter._id;
  }

  onUpdate(){
    console.log(this.name);
    
      const user = {
        name: this.name,
        nic: this.nic,
        district: this.district,
        id: this.voter_id
    
      };
      // required
      if (!this.validateService.validateVoterUpdate(user)) {
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
     
  
      // Update user
      this.authService.updateVoter(user).subscribe(data => {
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
          
          
        }
      });
    
  }

}
