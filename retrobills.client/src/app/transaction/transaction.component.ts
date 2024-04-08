import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction'; // interface
import { TransactionService } from '../services/transaction.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../account';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
        transactionType: new FormControl('', Validators.required),
        amount: new FormControl(0, Validators.required),
        categoryName: new FormControl('', Validators.required),
        transactionDescription: new FormControl(''),
        accountId: new FormControl('', Validators.required)
    });

    // Load accounts for the current user
    this.route.params.subscribe(params => {
      const userId = 1; // Assuming user ID 1 for demo
      this.getAccountsForUser(userId);
      this.selectedAccountId = +params['accountId']; // Get account ID from URL
    });
  }

  getTransactions() {
    const userId = 1; // Retrieve the actual user ID dynamically
    this.transactionService.getTransactionsByUser(userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  getAccountsForUser(userId: number) {
    this.transactionService.getAccountsByUser(userId)
      .subscribe(accounts => {
        this.accounts = accounts;
        console.log("This.accounts : ", this.accounts);
        console.log("accounts : ", accounts);
        // Select the account based on the URL parameter
        console.log("Selected Account Id : ", this.selectedAccountId)
        if (this.selectedAccountId) {
          const selectedAccount = this.accounts.find(account => account.accountId === this.selectedAccountId);
          console.log ("const selected Account : ", selectedAccount)
          if (selectedAccount) {
            this.transactionForm.patchValue({ accountId: selectedAccount.accountId });
          }
        }
      });
  }

  onSubmit() {
    const transactionData: Transaction = this.transactionForm.value;

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
