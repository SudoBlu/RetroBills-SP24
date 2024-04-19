import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDTO } from '../DTOs/AccountDTO';
import { Account } from '../account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiBaseUrl = 'https://localhost:7201/api/Account';

  constructor(private http: HttpClient) { }

    getAccountById(accountId: number): Observable<Account> 
    {
        return this.http.get<Account>(`${this.apiBaseUrl}/${accountId}`);
    }

    getAllAccounts(): Observable<Account[]> 
    {
        return this.http.get<Account[]>(`${this.apiBaseUrl}`);
    }

    getAccountsForUser(userId: number): Observable<Account[]> 
    {
        return this.http.get<Account[]>(`${this.apiBaseUrl}/${userId}/accounts`);
    }

    createAccount(userId: number, accountDTO: AccountDTO): Observable<Account> {
        const params = new HttpParams().set('userId', userId); 
        return this.http.post<Account>(this.apiBaseUrl, accountDTO, { params }); 
      }
        
    updateAccount(userId: number, accountId: number, accountDTO: AccountDTO): Observable<any> 
    {
        return this.http.put(`${this.apiBaseUrl}/${userId}/accounts/${accountId}`, accountDTO);
    }

    updateAccountBalance(userId: number, accountId: number, balance: number): Observable<any> {
      const url = `${this.apiBaseUrl}/${userId}/accounts/${accountId}/balance`;
      return this.http.put(url, balance);
    }    
    
    deleteAccount(userId: number, accountId: number): Observable<any> 
    {
        return this.http.delete(`${this.apiBaseUrl}/${userId}/accounts/${accountId}`);
    }
}
