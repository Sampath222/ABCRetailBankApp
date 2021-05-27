import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AddMoney, BankDetails } from '../bankdetail.model';
import { OrderPipe } from '../order.pipe';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('tabledata', { static: false }) tabledata: ElementRef;
  public details: BankDetails[] = [];
  public alldetails: BankDetails[] = [];
  public Tokenid: null;
  public alltranarr = [];
  public alltranarrsort = [];
  public TranDet: AddMoney[] = [];
  public AccNos: number;
  public Ctot:number = 0;
  public Stot:number = 0;
  public Saltot:number = 0;

  constructor(private authserv: AuthenticationService, private ordr: OrderPipe) {
    debugger;

    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0];
    this.authserv.LoginAdmin();
    this.Getdata();

    this.authserv.GetTransactions(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.TranDet = responsedata;
      this.alltranarr = this.authserv.BalanceSum(this.details, this.TranDet);
    });
  }

  Getdata() {
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      debugger;
      //console.log(responsedata);
      this.details = this.alldetails = responsedata;
      this.AccNos = this.details.length;
    });
  }

  ngOnInit(): void {
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0];
    this.authserv.LoginAdmin();
    this.Getdata();

    this.authserv.GetTransactions(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.TranDet = responsedata;
      this.alltranarr = this.authserv.BalanceSum(this.details, this.TranDet);
      this.alltranarrsort = this.alltranarr;

      debugger;
      this.alltranarr.forEach(obj => {
        if (obj.AccountType == "Savings Account") {
          this.Stot += obj.Balance;
        }
        if (obj.AccountType == "Current Account") {
          this.Ctot += obj.Balance;
        }
        if (obj.AccountType == "Salary Account") {
          this.Saltot += obj.Balance;
        }
      });
    });
  }

  Search(val: string) {
    debugger;
    //alert(val);
    if (val != undefined && val != null && val != "") {
      //this.alltranarrsort = this.alltranarr;
      this.alltranarr = this.alltranarrsort.filter(res => {
        return res.CustomerName.toLocaleLowerCase().match(val.toLocaleLowerCase());
      });
    }
    else {
      this.alltranarr = this.alltranarrsort;
    }
  }

  Itemselected(val: string) {
    debugger;
    this.alltranarr = this.ordr.transform(this.alltranarrsort, "CustomerName", val);
  }

  ExportTOExcel() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tabledata.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AccountSummary.xlsx');
  }

}