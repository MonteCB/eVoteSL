import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  releaseResults: Boolean;
  candidates: any[] = [];
  rejected:any;
  total_votes:any;

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        this.releaseResults =  data[0].can_release;
        this.rejected =  data[0].rejected;
        this.total_votes =  data[0].total_votes;


        if (data[0].can_release == true) {
          this.userService.getCandidate()
            .subscribe(candidates => {
              var arr = candidates;
              var n = candidates.length;

              for (var i = 0; i < n - 1; i++) {
                for (var j = 0; j < n - i - 1; j++) {
                  if (arr[j].votes < arr[j + 1].votes) {
                    // swap temp and arr[i]
                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                  }
                }
              }
              this.candidates = arr;
            });
        } else {
          this.router.navigate(['/']);
        }

      });

  }

}
