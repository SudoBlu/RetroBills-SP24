import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLoggedIn = false;
  isAuthenticated(){
    return this.isLoggedIn;
  }

  loginUser(){
    this.isLoggedIn = true;
  }

  logoutUser(){
    this.isLoggedIn = false;
  }
}
