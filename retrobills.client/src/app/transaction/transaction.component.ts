import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../services/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../account';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionDTO } from '../DTOs/TransactionDTO';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionTypes: string[] = ['Expense', 'Income'];
  categories: string[] = ['Rent', 'Groceries', 'Salary', 'Investments', 'Other Expense', 'Other Income'];
  transactionForm!: FormGroup;
  accounts: Account[] = [];
  userId!: number;
  selectedAccountId!: number;

  constructor(private transactionService: TransactionService,
              private router: Router,
              private route: ActivatedRoute) { }

ngOnInit(): void {
  //this.getTransactions(); //fetch all transactions

  this.transactionForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    accountId: new FormControl('', Validators.required),
    transactionType: new FormControl('Expense', Validators.required),
    categoryName: new FormControl('Rent', Validators.required),
    amount: new FormControl(0, Validators.required),
    transactionDescription: new FormControl(''),
});

  this.route.queryParams.subscribe(params => {
      this.selectedAccountId = +params['accountId'];
      console.log("selected Account : ", this.selectedAccountId);

      this.userId = +params['id'];
      console.log('User ID Before Nan check:', this.userId);

      if (isNaN(this.userId)) {
        console.error('Invalid user ID:', params['id']);
      } else {
        console.log('User ID:', this.userId);
        if(this.selectedAccountId > 0){
          this.getAccountsForUser(this.userId, this.selectedAccountId);
        }

        if(this.selectedAccountId == 0){
          console.log('User has no accounts...')
        }
      }

      this.transactionForm.patchValue({
        userId: this.userId,
        selectedAccountId: this.selectedAccountId
      })
    });
}

  getTransactions() {
    this.transactionService.getTransactionsByUser(this.transactionForm.value.userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  getAccountsForUser(userId: number, selectedAccountId: number) {
    this.transactionService.getAccountsByUser(userId)
      .subscribe(accounts => {
        this.accounts = accounts;
        console.log("This.accounts : ", this.accounts);
        console.log("accounts : ", accounts);
        // Select the account based on the URL parameter
        console.log("Selected Account Id : ", selectedAccountId)
        if (selectedAccountId) {
          const selectedAccount = this.accounts.find(account => account.accountId === selectedAccountId);
          console.log ("const selected Account : ", selectedAccount)
          if (selectedAccount) {
            this.transactionForm.patchValue({ accountId: selectedAccount.accountId });
          }
        }
      });
  }

  onAccountSelected(event: any) {
    const accountId = event.target.value;
    this.selectedAccountId  = accountId;
  }

  onSubmit() {
    console.log("DMIPWADIASPDNWAIPNDAS");
    const transactionData: TransactionDTO = this.transactionForm.value;
    console.log("Data of the transactions : " , transactionData);

    this.transactionService.createTransaction(transactionData)
      .subscribe(
        (newTransaction) => {
          console.log('Transaction created:', newTransaction);
          // Reset the form after successful submission
          console.log("SOCLOSE: ", this.selectedAccountId);
          // Call OnSaveClick with the selectedAccountId
          this.OnSaveClick(this.selectedAccountId);

          this.transactionForm.reset(); 
          
        },
        (error) => console.error('Error creating transaction:', error)
      );
  }

  OnSaveClick(accountId: number): void {
    this.router.navigate(['dashboard', this.userId], {
      queryParams: { accountId: accountId }
    });
  }
  
}
