import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errormsg: string = null;
  frmgroup: FormGroup;
  Adminuser: string = "admin1@gmail.com";

  constructor(private fmbuilder: FormBuilder, private authserv: AuthenticationService, private _router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.frmgroup = this.fmbuilder.group({
      usernm: [null, Validators.required],
      pswd: [null, Validators.required]
    });
  }

  Onlogsave(): void {
    debugger;
    this.authserv.LoginwithPwd(this.frmgroup.value.usernm, this.frmgroup.value.pswd).subscribe(responsedata => {
      console.log(responsedata);
      if (responsedata != null) {
        if (this.frmgroup.value.usernm == this.Adminuser) {
          this.authserv.LoginAdmin();
          this._router.navigate(['/dashboard'], { relativeTo: this.rout });
        }
        else {
          this.authserv.LoginUser();
          this._router.navigate(['/overview'], { relativeTo: this.rout });
        }
      }
    }, error => {
      console.log(error);
      this.errormsg = error;
      ;
    });
  }
}
