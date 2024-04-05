import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../account';
import { AccountDTO } from '../DTOs/AccountDTO';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent implements OnInit{
  accounts: Account[] = [];
  selectedAccountType: string = 'Checking';

  constructor(private accountService: AccountService,
    private route: ActivatedRoute) {}

    ngOnInit() {
      // Retrieve userId from the route
      this.route.paramMap.subscribe(params => {
        const userIdString = params.get('userId');
        const userId = userIdString ? +userIdString : 0;  // Assuming userId is in route parameters
        this.accountService.getAccountsForUser(userId).subscribe(accounts => {
          this.accounts = accounts;
        });
      });
    }

    getCurrentUserId(): number {
      let userId = 0; 
      this.route.paramMap.subscribe(params => {
        const userIdString = params.get('userId');
        userId = userIdString ? +userIdString : 0; 
      });
      return userId; 
    }
  

    onCreateAccount() {
      const userId = this.getCurrentUserId(); 
      const accountDTO: AccountDTO = { 
        AccountType: this.selectedAccountType,
      };

      this.accountService.createAccount(userId, accountDTO).subscribe(
        () => { console.log('Account created successfully!'); /* Handle success */ },
        error => { console.error('Account creation error:', error); /* Handle errors */ }
      );  
    }  
}
