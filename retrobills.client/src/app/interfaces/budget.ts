import { Account } from "../account";

export interface Budget{
    BudgetId: number;
    AccountId: number;
    BudgetAmount: number;
    Account: Account;
}