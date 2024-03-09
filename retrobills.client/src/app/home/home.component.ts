import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

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

  OnAboutClicked(){
    this.router.navigate(['home/about'])
  }

  OnContactClicked(){
    this.router.navigate(['home/contact'])
  }

  OnHomeClicked(){
    this.router.navigate([''])
  }
}
