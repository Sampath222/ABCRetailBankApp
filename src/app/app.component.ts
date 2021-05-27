import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABCRetailBankApp';

  constructor(private authserv: AuthenticationService) {
    this.authserv.HomePageLoad();
  }
}
