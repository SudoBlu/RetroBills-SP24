import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Chart, registerables as registerable } from 'chart.js';
import { BudgetsService } from '../services/budgets.service';
import { EMPTY, of } from 'rxjs';
import { Budget } from '../interfaces/budget';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../transaction';
import { Account } from '../account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-report.component.html',
  styleUrl: './budget-report.component.css'
})
export class BudgetReportComponent implements OnInit{
  tableData: number[] = [0, 0, 0, 0];
  transactions: Transaction[] = [];
  public chart: any;
  public account: Account = {
    accountId: 0,
    accountType: '',
    balance: 0,
    transactions: []
  };

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private budgetService: BudgetsService, private transactionService: TransactionService, private accountService: AccountService) {Chart.register(...registerable)}


  async ngOnInit(): Promise<void> {
    this.account = await this.getAccount(this.accountId)
    let budget: Budget
    console.log(`Retrieving budget from accountId: ${this.accountId}`)
    budget = await this.checkForBudget(this.accountId);
    let testData = await this.getTransactionData(this.accountId);
    this.updateTableData(testData, budget.budgetAmount)
    this.createChart();
  }
  userId = this.route.snapshot.params['userId']
  accountId = this.route.snapshot.params['accountId']


   /**
   * Navigates to the login page after clicking the Log In Button
   */
    OnDashClick(){
      this.router.navigate(['dashboard', this.userId])
    }

    OnBudgetClick(){
      this.router.navigate(['budget'])
    }

    OnReportClick(){
      this.router.navigate(['report'])
    }

    OnAddBudget(){
      this.router.navigate(['budget/creation/:userId'])
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
        labels: ['Rent', 'Groceries', 'Other Expense', 'Unspent'],
        datasets: [{
          label: 'Amount',
          data: this.tableData,
          backgroundColor: ['Red', 'Blue', 'Yellow', 'Gray'],
          hoverOffset: 36
        }],
      },
      options: {aspectRatio: 2.5}
    })
  }

  checkForBudget(accountID: number): Promise<Budget>{
    return new Promise<Budget>((resolve, reject) => {
      const subscription = this.budgetService.getBudget(accountID).subscribe(response => {
        console.log(response);
        console.log(response.budgetId);
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  getTransactionData(accountID: number): Promise<Transaction[]>{
    return new Promise<Transaction[]>((resolve, reject) => {
      const subscription = this.transactionService.getTransactionsByAccount(accountID).subscribe(response => {
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  updateTableData(transactions: Transaction[], budgetAmount: number){
    let totalAmount = 0;
    let unspent = 0;
    transactions.forEach(transaction => {
      totalAmount += transaction.amount;
      switch(transaction.categoryName){
        case 'Rent':
          this.tableData[0] += transaction.amount;
          break;
        case 'Groceries':
          this.tableData[1] += transaction.amount;
          break;
        case 'Other Expense':
          this.tableData[2] += transaction.amount;
          break;
        default:
          break;
      }
    });
    unspent = budgetAmount - totalAmount;
    if(unspent < 0) unspent = 0;
    this.tableData[3] = unspent;
  }

  getAccount(accountId: number){
    return new Promise<Account>((resolve, reject) => {
      const subscription = this.accountService.getAccountById(accountId).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }
}
