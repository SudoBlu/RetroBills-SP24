import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Account } from '../account';
import { Transaction } from '../transaction';
import { AccountService } from '../services/account.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedAccount!: Account;
  accounts: Account[] = [];
  transactions: Transaction[] = [];

  private userId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      if (isNaN(this.userId)) {
        console.error('Invalid user ID:', params['id']);
      } else {
        console.log('User ID:', this.userId);
        this.fetchAccountsForUser();
      }
    });
  }

  fetchAccountsForUser(): void {
    this.accountService.getAccountsForUser(this.userId).subscribe(
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
    this.selectedAccount = account;
    this.fetchTransactionsForSelectedAccount();
  }

  fetchTransactionsForSelectedAccount(): void {
    if (this.selectedAccount) {
      const accountId = this.selectedAccount.accountId;
      this.transactionService.getTransactionsByAccount(accountId).subscribe(
        (transactions: Transaction[]) => {
          this.selectedAccount!.transactions = transactions;
          console.log("Selected account:", this.selectedAccount);
          console.log("Transactions for selected account:", this.selectedAccount!.transactions);
          if (this.selectedAccount!.transactions && this.selectedAccount.transactions.length > 0) {
            console.log("Transactions exist.");
          } else {
            console.log("No transactions found.");
          }
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    }
  }

  OnDashClick(): void {
    this.router.navigate(['dashboard', this.userId])
  }

  OnDetailedClick(): void {
    this.router.navigate(['transaction/history', this.userId])
  }

  OnBudgetClick(): void {
    this.router.navigate(['budget', this.userId, this.selectedAccount.accountId])
  }

  OnHomeClick(): void {
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  OnAddClick(accountId: number): void {
    this.router.navigate(['/transaction', accountId]);
  }

  // Function to navigate to AccountCreationComponent and create a new account
  OnAddAccountClick() {
    if (this.userId) {
      this.router.navigate(['/createaccount', this.userId]);
    } else {
      console.error('User ID not found.');
    }
  }
}
