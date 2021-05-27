import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { BankDetails, AddMoney, alldet } from '../bankdetail.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public details: BankDetails[] = [];
  public TranDet: AddMoney[] = [];
  public alldet: alldet = new alldet();
  public Tokenid: null;
  public alltranarr = [];

  constructor(private authserv: AuthenticationService) {
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0];
    this.authserv.LoginUser();
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      //debugger;
      this.details = responsedata.filter(d => d.UserId == ldata[1]);
      //console.log(this.details);
    });

    this.authserv.GetTransactions(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.TranDet = responsedata;
      this.alltranarr = this.authserv.BalanceSum(this.details, this.TranDet);
    });
  }

  ngOnInit(): void {
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0];
    this.authserv.LoginUser();
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      //debugger;
      this.details = responsedata.filter(d => d.UserId == ldata[1]);
      //console.log(this.details);
    });

    this.authserv.GetTransactions(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.TranDet = responsedata;
      this.alltranarr = this.authserv.BalanceSum(this.details, this.TranDet);
    });
  }

}
