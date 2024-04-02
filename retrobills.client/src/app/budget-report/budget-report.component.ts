import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Chart, registerables as registerable } from 'chart.js';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-report.component.html',
  styleUrl: './budget-report.component.css'
})
export class BudgetReportComponent {
  tableData: any[] = [];
  transactions: any[] = [];
  public chart: any;


  addRow() {
    this.tableData.push(['', '', '', '']);
  }
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {Chart.register(...registerable)}
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
    OnSwitchClick(){
      this.router.navigate(['dashboard', this.userId])
    }

    OnBudgetClick(){
      this.router.navigate(['budget'])
    }

    OnHomeClick(){
      this.authService.logoutUser();
      this.router.navigate(['home'])
    }


  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if(this.chart){
        this.chart.destroy();
    }
  }

  createChart(){
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.width = 400;
    canvas.height = 400;
    document.querySelector('.chart-container')?.appendChild(canvas);

    this.chart = new Chart(canvas, {
      type: 'pie', //this denotes the type of chart
      data: { //values on the x-axis
        labels: ['Food', 'Groceries', 'Entertainment', 'Utilities', 'Transportation', 'Unspent'],
        datasets: [{
          label: 'Percentage spent',
          data: [25, 25, 10, 25, 5, 10],
          backgroundColor: ['red', 'pink', 'green', 'yellow', 'orange', 'blue'],
          hoverOffset: 36
        }],
      },
      options: {aspectRatio: 2.5}
    })
  }
}
