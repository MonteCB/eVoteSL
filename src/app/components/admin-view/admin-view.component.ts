import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  candidates: any[] = [];
  rejected: any;
  total_votes: any;

  constructor(private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        this.rejected = data[0].rejected;
        this.total_votes = data[0].total_votes;
      });
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
  }
}

