import { Transaction } from "./transaction";

export interface Account {
    accountId: number;
    accountType: string;
    Balance: number;
    Transactions: Transaction[];
}
