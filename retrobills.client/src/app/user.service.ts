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



  GetUsers(): Observable<User[]>{
    return this.http.get<any>(this.userUrl).pipe(
      map(response => response.users)
    );
  }

  GetUserByEmail(email: string): Observable<User>{
    return this.GetUsers().pipe(
      map(users => {
        let foundUser = users.find(user => user.Email === email);
        if(!foundUser) throw new Error('User not found')
        return foundUser;
      })
    )
  }
}
