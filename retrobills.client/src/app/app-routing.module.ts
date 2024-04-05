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
import { BudgetPageComponent } from "./budget-page/budget-page.component";
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { BudgetReportComponent } from './budget-report/budget-report.component';
import { BudgetCreationComponent } from './budget-creation/budget-creation.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';





import { AuthGuard } from "./auth/Auth.guard";
import { ReportsComponent } from "./reports/reports.component";
import { TransactionComponent } from "./transaction/transaction.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/about', component: AboutComponent},
  {path: 'home/contact', component: ContactComponent},
  {path: 'login', component: LoginPageComponent },
  {path: 'signup', component: SignupPageComponent },
  {path: 'recovery', component: AccountRecoveryComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'createaccount/:userId', component: AccountCreationComponent},
  {path: 'budget/report', component: BudgetReportComponent},
  {path: 'budget/creation', component: BudgetCreationComponent},
  {path: 'transaction/history', component: TransactionHistoryComponent},
  {path: '', redirectTo: 'home', pathMatch: "full"},

  {path: 'budget/:id',component: BudgetPageComponent, canActivate: [AuthGuard]},
  {path: 'dashboard/:id',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'transaction/history/:id', component: TransactionHistoryComponent, canActivate:[AuthGuard]},
  {path: 'reports/:id', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
