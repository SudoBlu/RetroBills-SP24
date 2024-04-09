import { HttpClient } from "@angular/common/http";
import { BudgetDTO } from "../DTOs/BudgetDTO";
import { Budget } from "../interfaces/budget";
import { Injectable } from "@angular/core";
import { catchError, of, throwError } from "rxjs";

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
      );
    }

    updateBudget(accountId: number, budgetDTO: BudgetDTO){
      return this.http.put<Budget>(`${this.budgetURL}/${accountId}`, budgetDTO).pipe(
        catchError(error => {
          // Handle errors from the backend (e.g., log to console)
          console.error('Error editing budget:', error);
          return throwError(() => new Error(error));
        })
      );
    }

    getBudget(accountId: number){
      return this.http.get<Budget>(`${this.budgetURL}/${accountId}`).pipe(
        catchError(error => {
          // Handle errors from the backend (e.g., log to console)
          if(error.status == 404){
            console.log('Budget not found, supplying fake budget...')
            const fakeBudget: Budget = {
              budgetId: 0,
              AccountId: 0,
              BudgetAmount: 0,
              Account: {
                accountId: 0,
                accountType: '',
                balance: 0,
                transactions: []
              }
            }
            return of(fakeBudget);
          }
          console.error('Error getting budget:', error);
          return throwError(() => new Error(error));
        })
      );
    }
}