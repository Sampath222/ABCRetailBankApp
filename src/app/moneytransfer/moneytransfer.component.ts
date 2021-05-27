import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { AddMoney, BankDetails, ToAddMoney } from '../bankdetail.model';

@Component({
  selector: 'app-moneytransfer',
  templateUrl: './moneytransfer.component.html',
  styleUrls: ['./moneytransfer.component.css']
})
export class MoneytransferComponent implements OnInit {
  public details: BankDetails[] = [];
  public filterdatas: BankDetails[] = [];
  public ToAccountDetails: BankDetails[] = [];
  public Tokenid: null;
  frmgrp: FormGroup;
  AddMoneyDet: AddMoney = new AddMoney();
  ToAddMoneyDet: ToAddMoney = new ToAddMoney();
  availbal: string;
  balflag: boolean = false;
  submitted: boolean = false;
  displaysuccess: string = "display: none;";

  constructor(private fmbuilder: FormBuilder,private authserv: AuthenticationService) { 
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0]; 
    this.authserv.LoginUser();
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.details = responsedata.filter(d => d.UserId == ldata[1] && d.Status == "Approved");
      this.ToAccountDetails = responsedata.filter(k => k.AccountNumber != this.details[0].AccountNumber && k.Status == "Approved");
      console.log(this.details);
    });
  }

  ngOnInit(): void {
    this.frmgrp = this.fmbuilder.group({
      AccNo: [null, Validators.required],
      ToAccNo: [null, Validators.required],
      Amt: [null, Validators.required]
    });
  }

  get frmcontrols(){
    return this.frmgrp.controls;
  }

  OnitemSelected(val: string) {
    this.filterdatas = this.details;
    this.filterdatas = this.filterdatas.filter(d => d.AccountNumber == val);
    this.authserv.GetTransactions(this.Tokenid).subscribe(responsedata => {
      debugger;
      let res = responsedata;
      let abal = this.authserv.BalanceSum(this.filterdatas, res);
      //alert(abal);
      if (abal != null && abal.length > 0) {
        this.availbal = abal[0].Balance;
      }
    });
    //this.availbal=this.authserv.BalanceSum(this.filterdatas,this.filterdatas);
    //console.log(this.details);
  }

  TransferMoney(frmvalues: NgForm) {
    debugger;
    this.submitted = true;
    if (this.availbal < this.frmgrp.value.Amt) {
      this.balflag = true;
      return;
    }
    if (this.frmgrp.valid) {
      this.submitted = false;
      this.AddMoneyDet.AccountNumber = this.frmgrp.value.AccNo;
      this.AddMoneyDet.Txn_Amount = this.frmgrp.value.Amt;
      this.AddMoneyDet.Txntype = "Dr";
      this.authserv.PostAddMoneyRecord(this.AddMoneyDet, this.Tokenid);

      this.ToAddMoneyDet.AccountNumber = this.frmgrp.value.ToAccNo;
      this.ToAddMoneyDet.Txn_Amount = this.frmgrp.value.Amt;
      this.ToAddMoneyDet.Txntype = "Cr";
      this.authserv.PostAddMoneyRecord(this.ToAddMoneyDet, this.Tokenid);
      this.displaysuccess = "display: block;";
          setTimeout(() => {
            this.displaysuccess = "display: none;";
          }, 4000);
      frmvalues.resetForm();
      this.filterdatas.splice(0, 1);
      this.balflag = false;
    }
  }

}
