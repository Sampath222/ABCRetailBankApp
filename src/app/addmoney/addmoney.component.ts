import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AddMoney, BankDetails } from '../bankdetail.model';

@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.component.html',
  styleUrls: ['./addmoney.component.css']
})
export class AddmoneyComponent implements OnInit {
  public details: BankDetails[] = [];
  public filterdatas: BankDetails[] = [];
  public Tokenid: null;
  AddMoneyDet: AddMoney = new AddMoney();
  frmgrp: FormGroup;
  submitted: boolean = false;
  displaysuccess: string = "display: none;";

  constructor(private fmbuilder: FormBuilder,private authserv: AuthenticationService) { 
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0]; 
    this.authserv.LoginUser();
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.details = responsedata.filter(d => d.UserId == ldata[1] && d.Status == "Approved");
      console.log(this.details);
    });
  }

  ngOnInit(): void {
    this.frmgrp = this.fmbuilder.group({
      AccNo: [null, Validators.required],
      Amt: [null, Validators.required]
    });
  }

  get frmcontrols(){
    return this.frmgrp.controls;
  }

  OnitemSelected(val: string) {
    this.filterdatas = this.details;
    this.filterdatas = this.filterdatas.filter(d => d.AccountNumber == val);
    //console.log(this.details);
  }

  AddMoney(frm: NgForm) {
    //alert('sss' + accno + amt);
    debugger;
    this.submitted = true;
    if (this.frmgrp.valid) {
      this.submitted = false;
      this.AddMoneyDet.AccountNumber = this.frmgrp.value.AccNo;
      this.AddMoneyDet.Txn_Amount = this.frmgrp.value.Amt;
      this.AddMoneyDet.Txntype = "Cr";

      this.authserv.PostAddMoneyRecord(this.AddMoneyDet, this.Tokenid);
      this.displaysuccess = "display: block;";
          setTimeout(() => {
            this.displaysuccess = "display: none;";
          }, 4000);
      frm.resetForm();
      this.filterdatas.splice(0, 1);
    }
  }

}
