import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction'; // interface
import { TransactionService } from '../services/transaction.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
        transactionType: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required), 
        categoryName: new FormControl('', Validators.required),
        transactionDescription: new FormControl('') 
    });
}

  getTransactions() {
    const userId = 1; // Retrieve the actual user ID dynamically
    this.transactionService.getTransactionsByUser(userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  onSubmit() {

    const transactionData: Transaction = this.transactionForm.value; 
    
    this.transactionService.createTransaction(this.transaction)
      .subscribe(
        (newTransaction) => {
            this.transactions.push(newTransaction); 
            this.transaction = {} as Transaction; 
        },
        (error) => console.error('Error creating transaction:', error) 
      );
  }
}
