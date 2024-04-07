import { Account } from "../account";

export interface Budget{
    budgetId: number;
    AccountId: number;
    BudgetAmount: number;
    Account: Account;
}