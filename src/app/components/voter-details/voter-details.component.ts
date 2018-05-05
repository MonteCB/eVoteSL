import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.css']
})
export class VoterDetailsComponent implements OnInit {
  voters: any[] = [];

  constructor(private userService: UserService) {
    this.userService.getVoter()
      .subscribe(voters => {
        this.voters = voters;
      });
  }

  ngOnInit() {

  }
  deleteVoter(id) {
    
    if(confirm("Are you sure to delete this voter?")) {
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
  }

}
