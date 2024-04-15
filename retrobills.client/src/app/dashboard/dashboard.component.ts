import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  accountId: number = 0;
  accountBalance: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.accountId = params['accountId'])
    //console.log(this.accountId)
    this.route.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      if (isNaN(this.userId)) {
        console.error('Invalid user ID:', params['id']);
      } else {
        console.log('User ID:', this.userId);
        if(this.accountId > 0){
          this.fetchAccountsForUser();
        }

        if(this.accountId == 0){
          console.log('User has no accounts...')
        }
      }
    });
  }

  fetchAccountsForUser(): void {
    let index = 0;
    this.accountService.getAccountsForUser(this.userId).subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        if (this.accounts.length > 0) {
          this.accounts.sort((a, b) => a.accountId - b.accountId);
          if(this.accountId! > 0){
            //console.log('Fetching for existing account...')
            index = this.accounts.findIndex(x => x.accountId == this.accountId)
            this.selectedAccount = this.accounts[index];
            this.fetchTransactionsForSelectedAccount();
          }
        }
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  switchAccount(account: Account): void {
    // Check if the selected account is different from the previously selected one
    if (this.selectedAccount && this.selectedAccount.accountId === account.accountId) {
      // If it's the same account, no need to fetch transactions again
      return;
    }
  
    // Proceed with fetching transactions for the selected account
    this.selectedAccount = account;
    this.accountId = account.accountId;
    this.fetchTransactionsForSelectedAccount();
  
    // Update both route path and query parameters
    const navigationExtras: NavigationExtras = {
      queryParams: { accountId: this.accountId }
    };
  
    // Navigate to the same route with updated query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { accountId: this.accountId },
      queryParamsHandling: 'merge'
    });
  }
  

  fetchTransactionsForSelectedAccount(): void {
    if (this.selectedAccount) {
      const accountId = this.selectedAccount.accountId;
      this.accountBalance = this.selectedAccount.balance;
      this.transactionService.getTransactionsByAccount(accountId).subscribe(
        (transactions: Transaction[]) => {
          this.selectedAccount!.transactions = transactions.sort((a, b) => new Date(b.transactionDateTime).getTime() - new Date(a.transactionDateTime).getTime()).slice(0, 9);
          // console.log("Selected account:", this.selectedAccount);
          // console.log("Transactions for selected account:", this.selectedAccount!.transactions);
          if (this.selectedAccount!.transactions && this.selectedAccount!.transactions.length > 0) {
            //console.log("Transactions exist.");
            
            let total = this.accountBalance;

            this.selectedAccount.transactions.forEach(transaction  => {
              if(transaction.transactionType === 'Income'){
                total += transaction.amount;
                //console.log("Transaction Add :", total);
              }
              else{
                total -= transaction.amount
                //console.log("Transaction Minus :", total);
              }
            });

            // console.log("TOTAL BEFORE : ", total);
            // console.log("ACCOUNT BALANCE BEFORE : ", this.accountBalance);
            // console.log("SELECT ACCOUNT BALANCE BEFORE: ", this.selectedAccount.balance);
            
            this.accountBalance = total;
            this.selectedAccount.balance = total;

            // console.log("TOTAL AFTER : ", total);
            // console.log("ACCOUNT BALANCE AFTER : ", this.accountBalance);
            // console.log("SELECT ACCOUNT BALANCE AFTER: ", this.selectedAccount.balance);
            
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
    this.router.navigate(['dashboard', this.userId], {
      queryParams: { accountId: this.accountId }
    });
  }

  OnDetailedClick(): void {
    this.router.navigate(['transaction/history', this.userId, this.accountId])
  }

  OnBudgetClick(): void {
    this.router.navigate(['budget', this.userId, this.selectedAccount!.accountId])
  }

  OnHomeClick(): void {
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }

  OnAddClick(accountId: number): void {
    this.router.navigate(['transaction'], {
      queryParams: { id: this.userId, accountId: accountId }
    });
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
