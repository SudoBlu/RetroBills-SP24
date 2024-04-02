import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit{
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}
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

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }
}
