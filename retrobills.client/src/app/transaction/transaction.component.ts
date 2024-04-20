import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../services/transaction.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../account';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionDTO } from '../DTOs/TransactionDTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  transactionTypes: string[] = ['Expense', 'Income'];
  categories: string[] = [];
  transactionForm!: FormGroup;
  accounts: Account[] = [];
  userId!: number;
  selectedAccountId!: number;

  private subscriptions: Subscription[] = [];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
        if (this.selectedAccountId > 0) {
          this.getAccountsForUser(this.userId, this.selectedAccountId);
        }

        if (this.selectedAccountId == 0) {
          console.log('User has no accounts...')
        }
      }

      this.transactionForm.patchValue({
        userId: this.userId,
        selectedAccountId: this.selectedAccountId
      });
    });

    // Initialize categories based on default transaction type
    this.updateCategories(this.transactionForm.value.transactionType);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getTransactions() {
    const subscription = this.transactionService.getTransactionsByUser(this.transactionForm.value.userId)
      .subscribe(transactions => this.transactions = transactions);
    this.subscriptions.push(subscription);
  }

  getAccountsForUser(userId: number, selectedAccountId: number) {
    const subscription = this.transactionService.getAccountsByUser(userId)
      .subscribe(accounts => {
        this.accounts = accounts;
        console.log("This.accounts : ", this.accounts);
        console.log("accounts : ", accounts);
        // Select the account based on the URL parameter
        console.log("Selected Account Id : ", selectedAccountId)
        if (selectedAccountId) {
          const selectedAccount = this.accounts.find(account => account.accountId === selectedAccountId);
          console.log("const selected Account : ", selectedAccount)
          if (selectedAccount) {
            this.transactionForm.patchValue({ accountId: selectedAccount.accountId });
          }
        }
      });
    this.subscriptions.push(subscription);
  }

  onAccountSelected(event: any) {
    const accountId = event.target.value;
    this.selectedAccountId = accountId;
  }

  // Update categories based on selected transaction type
  onTransactionTypeChange(event: any) {
    const selectedTransactionType = event.target.value;
    this.updateCategories(selectedTransactionType);
  }

  // Dynamically update categories based on transaction type
  updateCategories(transactionType: string) {
    if (transactionType === 'Expense') {
      this.categories = ['Rent', 'Groceries', 'Other Expense'];
    } else if (transactionType === 'Income') {
      this.categories = ['Investments', 'Salary', 'Other Income'];
    }
  }

  onSubmit() {
    const transactionData: TransactionDTO = this.transactionForm.value;
    const subscription = this.transactionService.createTransaction(transactionData)
      .subscribe(
        (newTransaction) => {
          console.log('Transaction created:', newTransaction);
          // Emit the new transaction to trigger balance update
          this.transactionService.emitNewTransaction(newTransaction);
          this.OnSaveClick(this.selectedAccountId);
          // Reset the form after successful submission
          this.transactionForm.reset();
        },
        (error) => console.error('Error creating transaction:', error)
      );
    this.subscriptions.push(subscription);
  }

  OnSaveClick(accountId: number): void {
    this.router.navigate(['dashboard', this.userId], {
      queryParams: { accountId: accountId }
    });
  }
}
