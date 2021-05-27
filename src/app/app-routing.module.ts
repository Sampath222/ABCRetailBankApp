import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationformComponent } from './applicationform/applicationform.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OverviewComponent } from './overview/overview.component';
import { AddmoneyComponent } from './addmoney/addmoney.component';
import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
import { ApprovalComponent } from './approval/approval.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "application", component: ApplicationformComponent },
  { path: "approval", component: ApprovalComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "overview", component: OverviewComponent },
  { path: "addmoney", component: AddmoneyComponent },
  { path: "moneytransfer", component: MoneytransferComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
