import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../transaction'
import { DatePipe } from '@angular/common';
import { Account } from '../account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private transactionService: TransactionService, private datePipe: DatePipe, private accountService: AccountService) {}


  private userId: number | undefined;
  private accountId: number | undefined;
  public selectedAccount: Account | undefined;
  public accounts: Account[] = [];
  public transactions: Transaction[] = [];
  async ngOnInit(): Promise<void> {
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['userId'])
    this.accountId = parseInt(this.route.snapshot.params['accountId'])
    console.log(this.userId);
    this.fetchAccountsForUser();
    this.transactions = await this.getTransactionHistory(this.accountId)
    console.log(this.transactions);
  }

  fetchAccountsForUser(): void{
    this.accountService.getAccountsForUser(this.userId!).subscribe({
      next: (accounts: Account[]) => {
        this.accounts = accounts;
        console.log(this.accounts);
        if(this.accounts.length > 0){
          this.accounts.sort((a, b) => a.accountId - b.accountId);
          let index = this.accounts.findIndex(x => x.accountId == this.accountId);
          this.selectedAccount = this.accounts[index];
        }
      }
    })
  }

  async switchAccount(account: Account){
    if(this.selectedAccount && this.selectedAccount.accountId === account.accountId){
      return;
    }

    this.selectedAccount = account;
    this.accountId = account.accountId;
    this.transactions = await this.getTransactionHistory(this.accountId);

    this.router.navigate(['transaction/history', this.userId, this.accountId])
  }

  /**
   * Navigates to the login page after clicking the Log In Button
   */
  OnDashClick(){
    this.router.navigate(['dashboard', this.userId], {queryParams: {accountId: this.accountId}})
  }

  OnBudgetClick(){
    this.router.navigate(['expense', this.userId, this.accountId])
  }
  OnHomeClick(){
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  getTransactionHistory(accountId: number){
    return new Promise<Transaction[]>((resolve, reject) => {
      const subscription = this.transactionService.getTransactionsByAccount(accountId).subscribe(response => {
        resolve(response);
        subscription.unsubscribe();
      }, error => {
        reject(error);
        subscription.unsubscribe();
      })
    })
  }

  /**
   * Formats the date of a {@link Transaction} object to be
   * represented as a MM/DD/YYYY format
   * @param date the date of the transaction to format
   * @returns a string in the MM/DD/YYYY format
   */
  formatDate(date: Date){
    return this.datePipe.transform(date, 'MM/dd/yyyy');
  }
}
