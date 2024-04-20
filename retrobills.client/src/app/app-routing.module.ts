import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { LoginPageComponent } from "./login/login.component";
import { SignupPageComponent } from "./signup/signup.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { AccountRecoveryComponent } from "./account-recovery/account-recovery.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensePageComponent } from "./budget-page/budget-page.component";
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { ExpenseReportComponent } from './budget-report/budget-report.component';
import { ExpensePlanCreationComponent } from './budget-creation/budget-creation.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AuthGuard } from "./auth/Auth.guard";
import { TransactionComponent } from "./transaction/transaction.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/about', component: AboutComponent},
  {path: 'home/contact', component: ContactComponent},

  {path: 'login', component: LoginPageComponent },
  {path: 'signup', component: SignupPageComponent },

  {path: 'dashboard/:id',component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'createaccount/:userId', component: AccountCreationComponent, canActivate: [AuthGuard]},

  {path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]},
  {path: 'transaction/history/:userId/:accountId', component: TransactionHistoryComponent, canActivate: [AuthGuard]},

  {path: 'recovery/:userId', component: AccountRecoveryComponent, canActivate: [AuthGuard]},
 
  {path: 'expense/:userId/:accountId',component: ExpensePageComponent, canActivate: [AuthGuard]},
  {path: 'expense/report/:userId/:accountId', component: ExpenseReportComponent, canActivate: [AuthGuard]},
  {path: 'createexpenseplan/:userId/:accountId', component: ExpensePlanCreationComponent, canActivate: [AuthGuard]},

  {path: '**', component: PageNotFoundComponent},
  {path: '', redirectTo: 'home', pathMatch: "full"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
