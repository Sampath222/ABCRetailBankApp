import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeadersidenavComponent } from './headersidenav/headersidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { ApplicationformComponent } from './applicationform/applicationform.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { OverviewComponent } from './overview/overview.component';
import { AddmoneyComponent } from './addmoney/addmoney.component';
import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
import { OrderPipe } from './order.pipe';
import { ApprovalComponent } from './approval/approval.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeadersidenavComponent,
    DashboardComponent,
    ContactComponent,
    ApplicationformComponent,
    HomeComponent,
    AboutComponent,
    PagenotfoundComponent,
    OverviewComponent,
    AddmoneyComponent,
    MoneytransferComponent,
    OrderPipe,
    ApprovalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
