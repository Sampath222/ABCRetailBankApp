import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { BankDetails } from '../bankdetail.model';


@Component({
  selector: 'app-applicationform',
  templateUrl: './applicationform.component.html',
  styleUrls: ['./applicationform.component.css']
})
export class ApplicationformComponent implements OnInit {
  BankDet: BankDetails = new BankDetails();
  frmgrp: FormGroup;
  errormsg: string = null;
  submitted: boolean = false;
  displaysuccess: string = "display: none;";
  pwd: string;

  constructor(private fmbuilder: FormBuilder, private authserv: AuthenticationService) {}

  ngOnInit(): void {
    this.frmgrp = this.fmbuilder.group({
      title: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      pincode: [null, Validators.required],
      occupation: [null, Validators.required],
      state: [null, Validators.required],
      employmenttype: [null, Validators.required],
      typeofaccount: [null, Validators.required],
      mobileno: [null, Validators.required],
      chk: [false, Validators.requiredTrue]
    });
  }

  get appfrmcontrols(){
    return this.frmgrp.controls;
  }

  pwdlen(valu: string) {
    debugger;
    //alert(valu);
    this.pwd = valu;
  }

  SaveApplication(formvalues: NgForm) {
    debugger;

    this.submitted = true;
    if (this.frmgrp.valid) {
      this.submitted = false;
      //console.log("ss" + formvalues.value);
      //this.BankDet.Title = this.frmgrp.value.fName;
      this.BankDet.FirstName = this.frmgrp.value.firstName;
      this.BankDet.LastName = this.frmgrp.value.lastName;
      this.BankDet.Email = this.frmgrp.value.email;
      //this.BankDet.Password = this.frmgrp.value.password;
      this.BankDet.ContactAddress = this.frmgrp.value.address;
      this.BankDet.City = this.frmgrp.value.city;
      this.BankDet.State = this.frmgrp.value.state;
      this.BankDet.EmploymentType = this.frmgrp.value.employmenttype;
      this.BankDet.TypeofAccount = this.frmgrp.value.typeofaccount;
      this.BankDet.Pincode = this.frmgrp.value.pincode;
      this.BankDet.Occupation = this.frmgrp.value.occupation;
      this.BankDet.AccountNumber = this.AccountNumberCreation(10, 'sb');
      //this.BankDet.Txntype = 'Cr';
      this.BankDet.Mobileno = this.frmgrp.value.mobileno;
      this.BankDet.Status = 'Pending';

      this.authserv.SignUp(this.BankDet.Email, this.frmgrp.value.password).subscribe(responsedata => {
        console.log(responsedata);
        if (responsedata != null) {
          this.BankDet.UserId = responsedata.localId;
          this.authserv.PostRecord(this.BankDet);
          this.displaysuccess = "display: block;";
          setTimeout(() => {
            this.displaysuccess = "display: none;";
          }, 4000);
          formvalues.resetForm();
        }
      }, error => {
        //console.log(error);
        this.errormsg = error;
        ;
      });
    }
  }

  AccountNumberCreation(length: number, format: string): string {
    var randomChars = '0728500134';
    var result = '';
    if (format == "cc") {
      result = '9827-xxxx-8xxx-xxxx'.replace(/[x]/g, (c): string => {
        var r = Math.random() * 24, v = c == 'x' ? r : 0;
        return v.toString().charAt(0);
      });
      return result;
    }
    else {
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      return result;
    }
  }

}
