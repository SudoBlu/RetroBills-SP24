import { Transaction } from "./transaction";

export interface Account {
    AccountId: number;
    AccountType: string;
    Balance: number;
    Transactions: Transaction[];
}
