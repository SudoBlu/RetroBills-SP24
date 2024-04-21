import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Account } from '../account';
import { AccountService } from '../services/account.service';
import { Transaction } from '../transaction';
import { TransactionService } from '../services/transaction.service';
import { Budget } from '../interfaces/budget';
import { BudgetsService } from '../services/budgets.service';
import { BudgetTable } from '../budget-table';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrl: './budget-page.component.css'
})
export class ExpensePageComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private accountService: AccountService, private budgetService: BudgetsService, private transactionService: TransactionService) {}
  userId = this.route.snapshot.params['userId']
  accountId = this.route.snapshot.params['accountId']
  public account: Account = {
    accountId: 0,
    accountType: '',
    balance: 0,
    transactions: []
  };

  public budget: Budget = {
    budgetId: 0,
    budgetAmount: 0,
    AccountId: 0,
    Account: this.account
  }

  public remainingAmount: number = 0;
  public transactions: Transaction[] = [];
  public spendingTransactions: Transaction[] = []
  public budgetTableItems: BudgetTable[] = []
  public accounts: Account[] = []
  
  async ngOnInit(): Promise<void> {
    this.account = await this.getAccount(this.accountId);
    this.transactions = await this.getTransactionsForAccount(this.accountId);
    this.fetchAccountsForUser();
    this.budget = await this.getBudget(this.accountId);
    this.remainingAmount = this.budget.budgetAmount;
    this.spendingTransactions = this.filterSpendingTransactions(this.transactions)
    this.createBudgetTableItems();
  }

  fetchAccountsForUser(): void{
    this.accountService.getAccountsForUser(this.userId!).subscribe({
      next: (accounts: Account[]) => {
        this.accounts = accounts;
        console.log(this.accounts);
        if(this.accounts.length > 0){
          this.accounts.sort((a, b) => a.accountId - b.accountId);
          let index = this.accounts.findIndex(x => x.accountId == this.accountId);
          this.account = this.accounts[index];
        }
      }
    })
  }

  async switchAccount(account: Account){
    if(this.account && this.account.accountId === account.accountId){
      return;
    }

    this.account = account;
    this.accountId = account.accountId;
    this.transactions = await this.getTransactionsForAccount(this.accountId);
    this.spendingTransactions = this.filterSpendingTransactions(this.transactions);
    this.budgetTableItems = [];
    this.createBudgetTableItems();

    this.router.navigate(['expense', this.userId, this.accountId])
  }

  OnDashClick(){
    console.log(this.userId)
    this.router.navigate(['dashboard', this.userId], 
      {queryParams: {accountId: this.accountId}}
    )
  }

  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  OnAddBudget(){
    console.log('Adding budget...')
    this.router.navigate(['createexpenseplan', this.userId, this.accountId])
  }

  OnReportsClick(){
    this.router.navigate(['expense/report', this.userId, this.accountId])
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
      const subscription = this.budgetService.getBudget(accountId).subscribe
      (response => {
        console.log(response);
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  getTransactionsForAccount(accountId: number){
    return new Promise<Transaction[]>((resolve, reject) => {
      const subscription = this.transactionService.getTransactionsByAccount(accountId).subscribe
      (response => {
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  filterSpendingTransactions(accountTransactions: Transaction[]){
    return accountTransactions.filter(x => x.transactionType == 'Expense')
  }

  createBudgetTableItems(){
    let remaining = this.budget.budgetAmount;
    this.spendingTransactions.forEach(transaction => {
      remaining = remaining - transaction.amount;
      let object: BudgetTable = {
        categoryName: transaction.categoryName,
        transactionAmount: transaction.amount,
        remainingBudget: remaining
      }
      this.budgetTableItems.push(object);
    })
    this.remainingAmount = remaining;
  }
}
