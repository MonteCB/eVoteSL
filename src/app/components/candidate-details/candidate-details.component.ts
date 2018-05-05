import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  candidates:any[] = [];

  constructor(private userService: UserService) { }

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

}
