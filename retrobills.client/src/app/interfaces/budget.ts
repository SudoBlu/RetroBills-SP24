import { Account } from "../account";

export interface Budget{
    budgetId: number;
    AccountId: number;
    budgetAmount: number;
    Account: Account;
}