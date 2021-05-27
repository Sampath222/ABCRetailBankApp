import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { BankDet } from '../bankdetail.model';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  public Tokenid: null;
  public details: BankDet[] = [];  
  public filterdatas: any[] = [];
  public patchpayload: BankDet = new BankDet();
  displaysuccess: string = "display: none;";

  constructor(private fmbuilder: FormBuilder, private authserv: AuthenticationService) {
    var ldata = JSON.parse(localStorage.getItem("localdatas"));
    this.Tokenid = ldata[0];
    this.authserv.LoginAdmin();
    this.authserv.GetRecord(this.Tokenid).subscribe(responsedata => {
      debugger;
      this.details = responsedata.filter(k => k.Status == "Pending");
      //console.log(this.details);
    });   
  }

  ngOnInit(): void {

  }

  OnitemSelected(val: string) {
    this.filterdatas = this.details.filter(k => k.AccountNumber == val);
    console.log(this.filterdatas);
  }

  SaveApproval() {
    debugger;
    //this.patchpayload.id = this.filterdatas[0].id;
    this.patchpayload.FirstName = this.filterdatas[0].FirstName;
    this.patchpayload.LastName = this.filterdatas[0].LastName;
    this.patchpayload.Email = this.filterdatas[0].Email;
    this.patchpayload.ContactAddress = this.filterdatas[0].ContactAddress;
    this.patchpayload.AccountNumber = this.filterdatas[0].AccountNumber;
    this.patchpayload.Mobileno = this.filterdatas[0].Mobileno;
    this.patchpayload.Occupation = this.filterdatas[0].Occupation;
    this.patchpayload.Pincode = this.filterdatas[0].Pincode;
    this.patchpayload.TypeofAccount = this.filterdatas[0].TypeofAccount;
    this.patchpayload.City = this.filterdatas[0].City;
    this.patchpayload.Status = "Approved";
    this.patchpayload.UserId = this.filterdatas[0].UserId;

    this.authserv.UpdateRecord(this.patchpayload,this.filterdatas[0].id);
    this.displaysuccess = "display: block;";
          setTimeout(() => {
            this.displaysuccess = "display: none;";
          }, 4000);
  }

}