import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:user;
  usertype:string;
  admin:boolean=false;
  sAdmin:boolean=false;

  constructor(private router: Router) {
    this.usertype=JSON.parse(localStorage.getItem("user")).usertype;
    if(this.usertype==="admin"){  
      this.admin=true;
    }else if(this.usertype==="sAdmin"){
      this.sAdmin=true;
      this.router.navigate(['/dashboard']);
    }
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