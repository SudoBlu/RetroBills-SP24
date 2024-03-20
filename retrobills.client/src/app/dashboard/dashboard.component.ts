import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * Navigates to the login page after clicking the Log In Button
   */
  OnDashClick(){
    this.router.navigate(['dashboard'])
  }

  /**
   * Navigates to the signup page after
   * clicking the Sign Up button
   */
  OnDetailedClick(){
    this.router.navigate(['dashboard'])
  }

  OnBudgetClick(){
    this.router.navigate(['dashboard'])
  }

  OnHomeClick(){
    this.router.navigate(['home'])
  }
}
