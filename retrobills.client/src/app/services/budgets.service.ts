import { HttpClient } from "@angular/common/http";
import { BudgetDTO } from "../DTOs/BudgetDTO";
import { Budget } from "../interfaces/budget";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class BudgetsService{
    constructor(private http: HttpClient){}
    private budgetURL = 'https://localhost:7201/api/Budget'

    createBudget(accountId: number, budgetDTO: BudgetDTO){
        return this.http.post<Budget>(`${this.budgetURL}/${accountId}`, budgetDTO).pipe(
        catchError(error => {
          // Handle errors from the backend (e.g., log to console)
          console.error('Error creating budget:', error);
          return throwError(() => new Error(error));
        })
      );;
    }
}