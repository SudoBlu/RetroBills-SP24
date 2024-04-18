import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupPageComponent } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';


import { ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { BudgetReportComponent } from './budget-report/budget-report.component';
import { ReportsComponent } from './reports/reports.component';
import { SpendChartComponent } from './reports/spend-chart/spend-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BudgetCreationComponent } from './budget-creation/budget-creation.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginPageComponent,
    SignupPageComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    AccountRecoveryComponent,
    AboutComponent,
    BudgetPageComponent,
    TransactionComponent,
    AccountCreationComponent,
    BudgetReportComponent,

    ReportsComponent,
    SpendChartComponent,
    BudgetCreationComponent,
    TransactionHistoryComponent,
    BudgetReportComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
