import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  candidates: any[] = [];
  name: String;
  nic: String;
  party: String;
  candidate_no: Number;
  candidate_id: any;
  parties: any[] = [];


  constructor(private userService: UserService, private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getCandidate()
      .subscribe(candidates => {
        this.candidates = candidates;
      });
    this.userService.getParty()
      .subscribe(parties => {
        this.parties = parties;
      });

  }

  deleteCandidate(id) {

    swal({
      title: "Are you sure to remove this candidate?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.value) {
        var candidates = this.candidates;
        this.userService.deleteCandidate(id).subscribe(data => {

          if (data._id == id) {
            for (var i = 0; i < candidates.length; i++) {
              if (candidates[i]._id == id) {
                candidates.splice(i, 1);
              }
            }
          }
        })
      }
    })
  }

  editCandidate(candidate) {

    this.name = candidate.name;
    this.nic = candidate.nic;
    this.party = candidate.party;
    this.candidate_no = candidate.candidate_no;
    this.candidate_id = candidate._id;
  }

  onUpdate() {
    

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

    if (!this.validateService.validateNic(user.nic)) {
      swal({
        position: 'top',
        type: 'warning',
        title: 'Please enter a valid NIC',
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


      }
    });

  }

}
