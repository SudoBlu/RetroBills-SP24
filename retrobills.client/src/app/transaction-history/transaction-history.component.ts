import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../transaction'

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private transactionService: TransactionService) {}


  private userId: number | undefined;
  private accountId: number | undefined;
  public transactions: Transaction[] = [];
  async ngOnInit(): Promise<void> {
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['userId'])
    this.accountId = parseInt(this.route.snapshot.params['accountId'])
    console.log(this.userId);
    this.transactions = await this.getTransactionHistory(this.accountId)
    console.log(this.transactions);
  }

  /**
   * Navigates to the login page after clicking the Log In Button
   */
  OnDashClick(){
    this.router.navigate(['dashboard', this.userId], {queryParams: {accountId: this.accountId}})
  }

  OnBudgetClick(){
    this.router.navigate(['budget', this.userId, this.accountId])
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
}
