import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, find, map, max } from 'rxjs';

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

  CreateUser(username: string, firstName: string, lastName: string,password: string, address: string, email: string){
    let maxId: number;

    return this.FindMaxUserId().pipe(map(user => {
      maxId = user.UserId
      let newUser: User = {
        UserId: maxId,
        UserName: username,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Address: address
      };
      console.log(newUser);

      return this.WriteToJSON(newUser).pipe(
        map(response => {
        console.log('User successfully created', response);
        return true;
        }))}))
  }

  FindMaxUserId(): Observable<User>{
    return this.GetUsers().pipe(
      map(users => {
        let id = users.find(user => max((a) => a = user.UserId))
        console.log(id);
        if(!id) throw new Error('Error retrieving IDs for creation')
        return id;
      })
    );
  }

  WriteToJSON(data: User): Observable<any>{
    return this.http.post<any>(this.userUrl, data);
  }
}