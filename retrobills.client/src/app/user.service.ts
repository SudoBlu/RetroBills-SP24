import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'assets/mock-users.json';

  constructor(private http: HttpClient) { }

  /**
   * Gets users from the data source. Returns an Observable
   * of type User[]
   * @returns 
   */
  GetUsers(): Observable<User[]>{
    return this.http.get<any>(this.userUrl).pipe(
      map(response => response.users)
    );
  }

  /**
   * Attempts to find a user from the list of users by matching
   * the user's email. Returns a User object if found, undefined otherwise
   * @param email the email to match
   * @returns 
   */
  GetUserByEmail(email: string): Observable<User | undefined>{
    return this.GetUsers().pipe(
      map(users => {
        //find user based on email
        let foundUser = users.find(user => user.Email === email);

        //if not found, return undefined
        if(!foundUser) {return undefined}

        //return found user
        return foundUser;
      })
    )
  }
}