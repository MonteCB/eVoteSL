import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {

  candidates:any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCandidate()
      .subscribe(candidates => {
        this.candidates = candidates;
      });
  }

}
