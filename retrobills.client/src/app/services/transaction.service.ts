// transaction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Transaction } from '../transaction';
import { Account } from '../account';
import { TransactionDTO } from '../DTOs/TransactionDTO';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'https://localhost:7201';
  private transactionUrl = 'https://localhost:7201/api/Transaction'; // Replace with your base transaction API URL

  constructor(private http: HttpClient) { }

  // Create a new transaction
  createTransaction(transaction: TransactionDTO): Observable<Transaction> {
    console.log(transaction);
    return this.http.post<Transaction>(this.transactionUrl, transaction)
      .pipe(
        catchError(error => {
          // Handle errors from the backend (e.g., log to console)
          console.error('Error creating transaction:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Get a transaction by ID
  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.transactionUrl}/${id}`)
      .pipe(
        catchError(error => {
          // Handle errors fetching a specific transaction
          console.error('Error getting transaction by ID:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Get all transactions for a specific user
  getTransactionsByUser(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.transactionUrl}/user/${userId}`)
      .pipe(
        catchError(error => {
          // Handle errors fetching transactions for a user
          console.error('Error getting transactions by user:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Get all transactions for a specific account
  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.transactionUrl}/account/${accountId}`)
      .pipe(
        catchError(error => {
          // Handle errors fetching transactions for an account
          console.error('Error getting transactions by account:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Update an existing transaction
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.transactionUrl}/${transaction.transactionId}`, transaction)
      .pipe(
        catchError(error => {
          // Handle errors updating a transaction
          console.error('Error updating transaction:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Delete a transaction
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.transactionUrl}/${id}`)
      .pipe(
        catchError(error => {
          // Handle errors deleting a transaction
          console.error('Error deleting transaction:', error);
          return throwError(() => new Error(error));
        })
      );
  }

  // Get all accounts for a specific user
  getAccountsByUser(userId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/api/Account/${userId}/accounts`)
      .pipe(
        catchError(error => {
          console.error('Error getting accounts by user:', error);
          return throwError(() => new Error(error));
        })
      );
  }


}
