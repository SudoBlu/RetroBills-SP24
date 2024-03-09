import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: '../home/home.component.css'
})
export class AboutComponent {
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
