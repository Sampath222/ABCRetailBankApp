import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from "./authentication.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authservice: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        debugger;
        if (this.authservice.token != undefined && this.authservice.token != null && this.authservice.token != "") {
            const modifiedreq = req.clone({
                params: new HttpParams().set('auth', this.authservice.token)
            });
            return next.handle(modifiedreq);
        }
        else {
            return next.handle(req);
        }
    }
}