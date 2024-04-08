import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';
import { Account } from '../account';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  accounts: Account[] = [];
  selectedAccount: Account | null = null; // Track the selected account
  transactions: Transaction[] = [];

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private accountService: AccountService,
    private transactionService: TransactionService) {}

  private userId!: number;

  ngOnInit(): void {
    // Fetch route parameters
    this.route.params.subscribe(params => {
      //console.log(params); // Check if 'id' parameter is present
      this.userId = parseInt(params['id']);
      if (isNaN(this.userId)) {
        console.error('Invalid user ID:', params['id']);
      } else {
        console.log('User ID:', this.userId);
        // Fetch accounts for the logged-in user when the component initializes
        this.fetchAccountsForUser();
      }
    });
  }
  

  fetchAccountsForUser(): void {
    const userId = this.userId;
    this.accountService.getAccountsForUser(userId).subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        if (this.accounts.length > 0) {
          this.selectedAccount = this.accounts[0];
          this.fetchTransactionsForSelectedAccount();
        }
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  switchAccount(account: Account): void {
    //console.log("hitting switch account");
    this.selectedAccount = account;
    // Call method to fetch transactions for the selected account
    this.fetchTransactionsForSelectedAccount();
  }

  fetchTransactionsForSelectedAccount(): void {
    if (this.selectedAccount) {
      const accountId = this.selectedAccount.accountId;
      this.transactionService.getTransactionsByAccount(accountId).subscribe(
        (transactions: Transaction[]) => {
          this.selectedAccount!.Transactions = transactions;
          console.log("selected account: ", this.selectedAccount)
          //console.log("Balance : ", this.selectedAccount?.transactions)
          console.log("Transactions for selected account: ", this.selectedAccount?.Transactions);
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
  }

  OnDashClick(){
    this.router.navigate(['dashboard', this.userId])
  }

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

  OnAddClick(accountId: number) {
    this.router.navigate(['/transaction', accountId]);
  }
}
