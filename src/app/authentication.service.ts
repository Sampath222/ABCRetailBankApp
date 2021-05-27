import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { BankDetails, SubVariables, AddMoney, BankDet, alldet } from "./bankdetail.model";
import { map } from 'rxjs/operators';

interface Response {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    public alldet: alldet = new alldet();
    sidenav = new BehaviorSubject<SubVariables>({ IsAdmin: false, IsUser: false, IsDefault: false });
    logindex = new BehaviorSubject<number>(0);
    token: string;
    url: string = "https://abcretailbank-7285c-default-rtdb.firebaseio.com/UserInfo.json";
    Tranurl: string = "https://abcretailbank-7285c-default-rtdb.firebaseio.com/Transactions.json";
    patchurl: string = "https://abcretailbank-7285c-default-rtdb.firebaseio.com/UserInfo/"
    AddMoneyPosturl: string = "https://abcretailbank-7285c-default-rtdb.firebaseio.com/Transactions.json";
    APIKey: string = "AIzaSyDV1nrhaGZr-2bLNLK4UorvWTkB0OQvIzE";

    constructor(private http: HttpClient) { }

    LoginAdmin(): void {
        this.sidenav.next({ IsAdmin: true, IsUser: false, IsDefault: false });
        this.logindex.next(1);
    }

    LoginUser(): void {
        this.sidenav.next({ IsAdmin: false, IsUser: true, IsDefault: false });
        this.logindex.next(1);
    }   

    HomePageLoad(): void {
        this.sidenav.next({ IsAdmin: false, IsUser: false, IsDefault: true });
    }

    SignUp(email: string, password: string) {
        return this.http.post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.APIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorrespons => {
                let errorMsg = 'An unknown error occured!.';
                if (!errorrespons.error || !errorrespons.error.error) {
                    return throwError(errorMsg);
                }
                switch (errorrespons.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMsg = "This email exists already";
                        break;
                    case 'WEAK_PASSWORD : Password should be at least 6 characters':
                        errorMsg = "Password should be at least 6 characters";
                        break;
                    default:
                        errorMsg = "An unknown error occured!.";
                        break;
                }
                return throwError(errorMsg);
            }), tap(res => {
                //debugger;
                this.token = res.idToken;
            }));
    }

    LoginwithPwd(email: string, password: string) {
        return this.http.post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.APIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(errorrespons => {
                let errorMsg = 'An unknown error occured!.';
                if (!errorrespons.error || !errorrespons.error.error) {
                    return throwError(errorMsg);
                }
                switch (errorrespons.error.error.message) {
                    case 'EMAIL_NOT_FOUND':
                        errorMsg = "This email was not found";
                        break;
                    case 'INVALID_PASSWORD':
                        errorMsg = "This password is invalid";
                        break;
                    case 'USER_DISABLED':
                        errorMsg = "This email has been disabled";
                        break;
                    default:
                        errorMsg = "An unknown error occured!.";
                        break;
                }
                return throwError(errorMsg);
            }), tap(res => {
                debugger;
                this.token = res.idToken;
                localStorage.setItem("localdatas", JSON.stringify([res.idToken, res.localId, email]));
            }));
    }

    PostRecord(payload: BankDetails) {
        this.http
            .post(this.url, payload)
            .subscribe(responsedt => {
                console.log(responsedt);
            });
    }

    PostAddMoneyRecord(payload: AddMoney, Token: string) {
        this.http
            .post(this.AddMoneyPosturl, payload, { params: new HttpParams().set('auth', Token) })
            .subscribe(responsedt => {
                console.log(responsedt);
            });
    }

    GetRecord(Token: string) {
        debugger;
        return this.http
            .get(this.url, { params: new HttpParams().set('auth', Token) })
            .pipe(map(resdata => {
                const Arrdata = [];
                this.token = Token;
                for (const k in resdata) {
                    if (resdata.hasOwnProperty(k)) {
                        Arrdata.push({ ...resdata[k], id: k });
                    }
                }
                return Arrdata;
            }));
    }

    GetTransactions(Token: string) {
        debugger;
        return this.http
            .get(this.Tranurl, { params: new HttpParams().set('auth', Token) })
            .pipe(map(resdata => {
                const Arrdata = [];
                this.token = Token;
                for (const k in resdata) {
                    if (resdata.hasOwnProperty(k)) {
                        Arrdata.push({ ...resdata[k], id: k });
                    }
                }
                return Arrdata;
            }));
    }

    UpdateRecord(payload: BankDet, id: string) {
        this.http
            .put(this.patchurl + id + ".json", payload)
            .subscribe(responsedt => {
                console.log(responsedt);
            });
    }

    BalanceSum(bankdet: any[], trandet: any[]): any[] {
        const alldetarr = [];
        for (let i of bankdet) {
            let Tot = 0;
            var det = trandet.filter(k => k.AccountNumber == i.AccountNumber);
            for (let v of det) {
                if (v.Txntype == "Cr") {
                    Tot += v.Txn_Amount;
                }
                else {
                    Tot -= v.Txn_Amount;
                }
            }
            console.log(Tot);
            this.alldet = new alldet();
            this.alldet.AccountNumber = i.AccountNumber;
            this.alldet.AccountType = "Savings Bank Account";
            this.alldet.CustomerName = i.FirstName + i.LastName;
            this.alldet.Mobileno = i.Mobileno;
            this.alldet.AccountType = i.TypeofAccount;
            this.alldet.Balance = Tot;
            this.alldet.Status = i.Status;

            alldetarr.push(this.alldet);
        }
        //console.log(this.TranDet);
        return alldetarr;
    }
}