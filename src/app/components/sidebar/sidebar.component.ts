import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usertype:string;
  admin:boolean=false;
  sAdmin:boolean=false;

  constructor(protected auth:AuthService) {
    //this.usertype=this.auth.getUser().usertype;
    this.usertype=JSON.parse(localStorage.getItem("user")).usertype;
    //this.auth.getUser().usertype;
    console.log(this.auth.getUser().usertype);
    if(this.usertype==="admin"){
      console.log(this.usertype);
      this.admin=true;
    }else if(this.usertype==="sAdmin"){
      this.sAdmin=true;
    }
  }


  ngOnInit() {
    
  }

}
