import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction'; // interface
import { TransactionService } from '../services/transaction.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../account';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  transaction: Transaction = {} as Transaction;

  transactionTypes: string[] = ['Expense', 'Income'];
  categories: string[] = ['Rent', 'Groceries', 'Salary', 'Investments'];

  transactionForm!: FormGroup;
  accounts: Account[] = [];
  selectedAccountId!: number;

  constructor(private transactionService: TransactionService,
              private router: Router) { } // Inject Router

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
        transactionType: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required),
        categoryName: new FormControl('', Validators.required),
        transactionDescription: new FormControl(''),
        accountId: new FormControl('', Validators.required)
    });

    // Load accounts for the current user
    this.getAccountsForUser(1); // Assuming user ID 1 for demo
  }

  getTransactions() {
    const userId = 1; // Retrieve the actual user ID dynamically
    this.transactionService.getTransactionsByUser(userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  getAccountsForUser(userId: number) {
    this.transactionService.getAccountsByUser(userId)
      .subscribe(accounts => this.accounts = accounts);
  }

  onSubmit() {
    const transactionData: Transaction = this.transactionForm.value;
    transactionData.AccountId = this.selectedAccountId;

    this.transactionService.createTransaction(transactionData)
      .subscribe(
        (newTransaction) => {
          console.log('Transaction created:', newTransaction);
          this.transactionForm.reset(); // Reset the form after successful submission
        },
        (error) => console.error('Error creating transaction:', error)
      );
  }

  OnSaveClick() {
    this.router.navigate(['home'])
  }
}
