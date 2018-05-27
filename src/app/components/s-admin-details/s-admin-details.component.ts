import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s-admin-details',
  templateUrl: './s-admin-details.component.html',
  styleUrls: ['./s-admin-details.component.css']
})
export class SAdminDetailsComponent implements OnInit {
  admins: any[] = [];
  constructor(private userService: UserService, private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getAdmin()
      .subscribe(admins => {
        this.admins = admins;
      });

  }

  deleteAdmin(id) {

    swal({
      title: "Are you sure to remove this admin?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove'
    }).then((result) => {
      if (result.value) {
        var admins = this.admins;
        this.userService.deleteAdmin(id).subscribe(data => {

          if (data._id == id) {
            for (var i = 0; i < admins.length; i++) {
              if (admins[i]._id == id) {
                admins.splice(i, 1);
              }
            }
          }
        })
      }
    })
  }

}
