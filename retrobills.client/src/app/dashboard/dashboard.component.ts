import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  private userId: number | undefined;
  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['id'])
    console.log(this.userId);
  }

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
    this.router.navigate(['transaction/history', this.userId])
  }

  OnBudgetClick(){
    this.router.navigate(['budget', this.userId])
  }

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }
}
