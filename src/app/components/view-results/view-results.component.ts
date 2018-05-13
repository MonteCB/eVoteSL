import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  releaseResults: Boolean;
  candidates: any[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        this.releaseResults = this.releaseResults = data[0].can_release;

        if (data[0].can_release == true) {
          this.userService.getCandidate()
            .subscribe(candidates => {
              this.candidates = candidates;
            });
        } else {
          this.router.navigate(['/']);
        }

      });

  }

}
