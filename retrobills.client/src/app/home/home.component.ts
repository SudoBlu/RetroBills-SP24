import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private router: Router) {}

  /**
   * Navigates to the login page after clicking the Log In Button
   */
  OnLoginClick(){
    this.router.navigate(['login'])
  }

  /**
   * Navigates to the signup page after
   * clicking the Sign Up button
   */
  OnSignUpClick(){
    this.router.navigate(['signup'])
  }
}
