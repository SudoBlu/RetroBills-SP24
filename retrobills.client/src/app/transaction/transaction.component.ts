import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // ... (other component properties)

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    // ... (potential code to fetch initial transactions on load)
  }

  newTransaction: Transaction = {
    // Initialize properties or leave empty if using default values
    TransactionId: 0, // Likely backend-assigned
    UserId: /* set user ID based on your logic */,
    accountId: /* set account ID based on your logic */,
    // ... other properties
  };
  

  onSubmit() {
    // Call TransactionService to create a new transaction
    this.transactionService.createTransaction(this.newTransaction)
      .subscribe(
        (createdTransaction) => {
          // Handle successful transaction creation (e.g., clear form, display success message)
          console.log('Transaction created:', createdTransaction);
          this.newTransaction = { /* reset form with defaults or desired state */ };
        },
        (error) => {
          // Handle errors from the service (e.g., display error message to the user)
          console.error('Error creating transaction:', error);
        }
      );
  }
  
}
