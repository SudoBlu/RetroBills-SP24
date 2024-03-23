import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, find, map, max, switchMap, throwError } from 'rxjs';

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

  CreateUser(username: string, firstName: string, lastName: string,password: string, address: string, email: string): Observable<boolean>{
    return this.FindMaxUserId().pipe(
      switchMap(maxId => {
        const newUser: User = {
          UserId: maxId + 1,
          UserName: username,
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          Address: address
        };
        return this.WriteToJSON(newUser);
      })
    )
  }

  FindMaxUserId(): Observable<number>{
    return this.GetUsers().pipe(
      map(users => {
        let maxId = 0;
        users.forEach(user => {
          if(user.UserId > maxId){
            maxId = user.UserId;
          }
        });
        return maxId
      }
    )
    )
  }

  WriteToJSON(data: User): Observable<boolean>{
    return this.GetUsers().pipe(
      switchMap(users => {
        users.push(data);
        return this.http.put(this.userUrl, {users}).pipe(
          map(() => true),
          catchError(() => {
            return throwError('Error writing to JSON file')
          })
        )
      })
    )
  }
}