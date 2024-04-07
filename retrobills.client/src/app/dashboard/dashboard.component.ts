import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../services/account.service';
import { Account } from '../account';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  accounts: Account[] = [];
  selectedAccount: Account | null = null; // Track the selected account

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private accountService: AccountService) {}

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
    const userId = this.userId; // Replace with actual user ID or fetch it dynamically
    this.accountService.getAccountsForUser(userId).subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        // Assume the first account is selected by default
        if (this.accounts.length > 0) {
          this.selectedAccount = this.accounts[0];
          // Call method to fetch transactions for the selected account
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
      this.accountService.getAccountById(accountId).subscribe(
        (account: Account) => {
          console.log('Account:', account);
        // Check if transactions array exists and is not empty
        if (account.Transactions && account.Transactions.length > 0) {
          // If transactions exist, update selected account with fetched data
          this.selectedAccount!.Transactions = account.Transactions;
          console.log('Transactions for selected account:', this.selectedAccount!.Transactions);
        } else {
          console.log('No transactions found for selected account');
        }
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

  OnAddClick(){
    this.router.navigate(['transaction'])
  }
}
