import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:user;
  constructor() {
    
   }

  ngOnInit() {
  }

}
interface user{
  id:string,
  name:string,
  username:string,
  email:string
}