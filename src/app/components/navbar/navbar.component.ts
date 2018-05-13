import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    swal({
      toast: true,
      
      title: "Logged Out",
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
