import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login/login.component';
import { SignupPage1Component } from './signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RecoveryComponent } from './recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RecoveryComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
