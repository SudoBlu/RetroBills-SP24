import { Transaction } from "./transaction";

export interface User {
    userId: number;
    UserName: string;
    password: string;
    email: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Transactions: Transaction[]
}