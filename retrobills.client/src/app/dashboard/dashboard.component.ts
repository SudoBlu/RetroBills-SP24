import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  userId = this.route.snapshot.params['userId']
  /**
   * Navigates to the login page after clicking the Log In Button
   */
  OnDashClick(){
    this.router.navigate(['dashboard', this.userId])
  }

  /**
   * Navigates to the signup page after
   * clicking the Sign Up button
   */
  OnDetailedClick(){
    this.router.navigate(['dashboard', this.userId])
  }

  OnBudgetClick(){
    this.router.navigate(['dashboard', this.userId])
  }

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }
}
