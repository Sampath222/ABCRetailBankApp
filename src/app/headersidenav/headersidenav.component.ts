import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-headersidenav',
  templateUrl: './headersidenav.component.html',
  styleUrls: ['./headersidenav.component.css']
})
export class HeadersidenavComponent implements OnInit {
  IsAdmin: boolean = false;
  IsUser: boolean = false;
  IsDefault: boolean = false;
  UserName: string;
  logtxt: string = "Login";

  constructor(private _router: Router, private rout: ActivatedRoute, private authserv: AuthenticationService) {
   debugger;

    this.authserv.sidenav.subscribe(data => {
      debugger;
      var ldata = JSON.parse(localStorage.getItem("localdatas"));
      this.UserName = (data.IsDefault == false) ? ldata[2].substring(0, ldata[2].indexOf("@")) : "";
      this.IsAdmin = data.IsAdmin;
      this.IsUser = data.IsUser;
      this.IsDefault = data.IsDefault;
    });

    this.authserv.logindex.subscribe(dt=>{
      debugger;
      this.logtxt = dt == 1 ? "Logout" : "Login";
    });
  }

  ngOnInit(): void {
  }

  Onlogin(value: string) {
    debugger;
    //alert(value);
    if (value.toLocaleLowerCase() == "logout") {
      this.logtxt = "Login";
    }
    this.authserv.HomePageLoad();
    this._router.navigate(['/login'], { relativeTo: this.rout });
  }

}
