import { Transaction } from "./transaction";

export interface Account {
    accountId: number;
    accountType: string;
    balance: number;
    transactions: Transaction[];
}
