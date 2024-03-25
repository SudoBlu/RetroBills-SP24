import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';

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
   * Retrieves the latest user from the data source
   * @returns An Observable with the latest user
   */
  GetLatestUser(): Observable<User>{
    return this.GetUsers().pipe(
      switchMap(users => {
        console.log(users);
        if(users.length > 0){
          console.log(users[users.length - 1])
          return of(users[users.length - 1])
        }else{
          throw new Error('No users found')
        }
      })
    )
  }

  /**
   * Retrieves a User from the data source based upon the
   * provided email string
   * @param email the email of the User to retrieve
   * @returns an Observable with the matched user or undefined
   */
  GetUserByEmail(email: string): Observable<User | undefined>{
    console.log(email);
    return this.GetUsers().pipe(
      switchMap(users => {
        console.log(users);
        if(users.length > 0){
          let foundUser = users.find(user => user.email === email);
          console.log(foundUser);
          return of(foundUser !== undefined ? foundUser : undefined);
        }else{
          throw new Error('No users found')
        }
      })
    )
  }

  /**
   * Creates a User entry in the database
   * @param userDTO the parameters of the User object
   * @returns 
   */
  CreateUser(userDTO: UserDTO){
    console.log(userDTO);
    return this.http.post<UserDTO>(`${this.userUrl}`, userDTO)
  }
}