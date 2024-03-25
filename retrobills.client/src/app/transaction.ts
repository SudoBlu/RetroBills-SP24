import { Account } from "./account";
import { User } from "./user";

export interface Transaction {
    TransactionId: number;
    UserId: number;
    AccountId: number;
    TransactionType: string;
    CategoryName: string;
    Amount: number;
    TransactionDateTime: Date;
    TransactionDescription?: string;
    Account: Account;
    User: User
}
