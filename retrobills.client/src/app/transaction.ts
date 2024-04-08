import { Account } from "./account";
import { User } from "./user";

export interface Transaction {
    transactionId: number;
    userId: number;
    accountId: number;
    transactionType: string;
    categoryName: string;
    amount: number;
    transactionDateTime: Date;
    transactionDescription?: string;
    Account: Account;
    User: User
}
