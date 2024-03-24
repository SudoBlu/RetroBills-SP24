import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private userUrl = 'assets/mock-users.json';
  private userUrl = 'https://localhost:7201/api/User';

  constructor(private http: HttpClient) { }

  /**
   * Gets users from the data source.
   * @returns An Observable with an array of Users found in the data source
   */
  GetUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  /**
   * Attempts to find a user from the list of users by matching
   * the user's email.
   * @param email the email to match
   * @returns Returns an Observable with a User object if found, 
   * undefined otherwise
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

  /**
   * Creates a User entry in the database
   * @param userDTO the parameters of the User object
   * @returns 
   */
  CreateUser(userDTO: any){
    return this.http.post<any>(`${this.userUrl}`, userDTO)
  }
}