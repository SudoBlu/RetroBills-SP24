import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginPageComponent} from './login/login.component';
import {SignupPage1Component} from './signup/signup.component'
import {RecoveryComponent} from './recovery/recovery.component'


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPage1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
