import { HttpClient } from "@angular/common/http";
import { BudgetDTO } from "../DTOs/BudgetDTO";
import { Budget } from "../interfaces/budget";

export class BudgetService{
    constructor(private http: HttpClient){}
    private budgetURL = 'https://localhost:7201/api/Budget'
    createAccount(accountId: number, budgetDTO: BudgetDTO){
        return this.http.post<Budget>(`${this.budgetURL}/${accountId}`, budgetDTO);
    }
}