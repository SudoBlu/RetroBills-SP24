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
import { SignupPage1Component } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginPageComponent,
    SignupPage1Component,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    AccountRecoveryComponent,
    AboutComponent,
    BudgetPageComponent,
    
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
