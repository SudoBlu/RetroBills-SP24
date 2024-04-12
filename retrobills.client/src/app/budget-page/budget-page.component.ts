import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Account } from '../account';
import { AccountService } from '../services/account.service';
import { BudgetsService } from '../services/budgets.service';
import { Budget } from '../interfaces/budget';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class BudgetPageComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private accountService: AccountService, private budgetService: BudgetsService) {}
  userId = this.route.snapshot.params['userId']
  accountId = this.route.snapshot.params['accountId']
  public budget: Budget | undefined;
  public account: Account = {
    accountId: 0,
    accountType: '',
    balance: 0,
    transactions: []
  };
  
  async ngOnInit(): Promise<void> {
    this.account = await this.getAccount(this.accountId)
    this.budget = await this.getBudget(this.accountId);
  }
  OnDashClick(){
    console.log(this.userId)
    this.router.navigate(['dashboard', this.userId])
  }

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  OnAddBudget(){
    this.router.navigate(['budget/create', this.userId])
  }

  OnReportsClicked(){
    this.router.navigate(['budget/report', this.budget])
  }

  getAccount(accountId: number){
    return new Promise<Account>((resolve, reject) => {
      const subscription = this.accountService.getAccountById(accountId).subscribe(response => {
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  getBudget(accountId: number){
    return new Promise<Budget>((resolve, reject) => {
      const subscription = this.budgetService.getBudget(accountId).subscribe(response => {
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }
}
