import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent {
  tableData: any[] = [];
  transactions: any[] = [];
  public chart: any;


  addRow() {
    this.tableData.push(['', '', '', '']);
  }
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  userId = this.route.snapshot.params['userId']
  OnDashClick(){
    this.router.navigate(['dashboard', this.userId])
  }

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }
}
