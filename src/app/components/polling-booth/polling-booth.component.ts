import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-polling-booth',
  templateUrl: './polling-booth.component.html',
  styleUrls: ['./polling-booth.component.css']
})
export class PollingBoothComponent implements OnInit {
  access: Boolean;
  election: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAccess()
      .subscribe(data => {
        this.election = data[0].name;
        if(data[0].started == false){
          
          this.access = false;
        }else{
          this.access = true;
        }
    });
  }

}
