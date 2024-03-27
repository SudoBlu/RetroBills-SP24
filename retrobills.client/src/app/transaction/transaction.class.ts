// transaction.class.ts
import { Transaction } from '../transaction';
import { Account } from '../account'; 
import { User } from '../user';

export class TransactionImplmentation implements Transaction {
    TransactionId: number; // No default, likely handled by the backend
    UserId: number; 
    AccountId: number; 
    TransactionType: string; 
    CategoryName: string; 
    Amount: number; 
    TransactionDateTime: Date; 
    TransactionDescription?: string | undefined; 
    Account: Account; 
    User: User; 

    constructor(account: Account, user: User) {
        this.TransactionId = -1; // Placeholder for backend-assigned ID 
        this.UserId = 0; // Assuming you'll manage UserId assignment
        this.AccountId = 0; // Assuming you'll manage AccountId assignment
        this.TransactionType = "Expense"; // Common default
        this.CategoryName = "General"; 
        this.Amount = 0;
        this.TransactionDateTime = new Date(); 
        this.Account = account; 
        this.User = user;
    }
}
