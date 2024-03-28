import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction'; // interface
import { TransactionService } from '../services/transaction.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../account';

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

  // In your transaction.component.ts
  accounts: Account[] = []; // To store fetched accounts
  selectedAccountId!: number; // To hold the selected account's ID

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {

    this.getTransactions(); //fetch all transactions

    this.transactionForm = new FormGroup({
        transactionType: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required), 
        categoryName: new FormControl('', Validators.required),
        transactionDescription: new FormControl(''),
        accountId: new FormControl('', Validators.required)
    });
}

  getTransactions() {
    const userId = 1; // Retrieve the actual user ID dynamically
    this.transactionService.getTransactionsByUser(userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  getAccountsForUser(userId: number) {
    this.transactionService.getAccountsByUser(userId) // Assuming you have such a method 
        .subscribe(accounts => this.accounts = accounts); 
  }

  onSubmit() {
    const transactionData: Transaction = this.transactionForm.value;
    transactionData.AccountId = this.selectedAccountId; 

    // Call TransactionService to create the transaction
    this.transactionService.createTransaction(transactionData)
        .subscribe(
            (newTransaction) => { 
                console.log('Transaction created:', newTransaction);
                // Optionally reset the form or display a success message
                this.transactionForm.reset(); // Consider resetting the form
            },
            (error) => console.error('Error creating transaction:', error)
        );
  }
}
