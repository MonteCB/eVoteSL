import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullImagePath: string;
  releaseResults: Boolean;

  constructor(private authService: AuthService) {
    this.fullImagePath = 'assets/image/Emblem_of_Sri_Lanka.svg.png';
  }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        
        this.releaseResults = data[0].can_release;
        
      });
  }

}
