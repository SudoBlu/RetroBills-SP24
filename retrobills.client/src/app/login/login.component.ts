import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent{
  constructor(private router: Router, private userService: UserService, private authService: AuthService, private accountService: AccountService) {}

  

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  invalidLogin: boolean = false; //flag to determine if valid email/password was given
  emptyForm: boolean = false; //flag to determine if all fields were filled out

  /**
   * A user is retrieved from the data source and the password is checked. An error is thrown if either
   * the user can't be found or if the password does not match the one from teh data source
   */
  async OnSubmit(){
    //get values from the form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.IsFormEmpty();

    //if the email and password are not null...
    if(!this.emptyForm){
      //get the user from the service
      this.userService.GetUserByEmail(email!).subscribe(
        response => {
          //if a user is found
          if(response) {
            console.log(response);
            //if the password matches
            if(response?.password === password){
              let accountId = 0;
              this.accountService.getAccountsForUser(response?.userId).subscribe(
                accounts => {
                  if(accounts.length > 0){
                    accountId = accounts[0].accountId;
                  }
                  //log the user in
                  this.authService.loginUser();
                  this.router.navigate(['dashboard', response?.userId], {
                    queryParams: {accountId: accountId}
              })
                }
              )

              
            } else{
              //throw error
              this.invalidLogin = true; 
              console.error('Invalid password')
            }
          }else {
            //throw error
            this.invalidLogin = true;
            console.error('A user could not be found')
          }
        },
        error => {
          console.error('Error occured while logging in: ', error)
        }
      )
    }
    
    //If the form is invalid
    if(this.loginForm.invalid) {
      console.log('This form is invalid')

      if(!email) console.error('Please enter an email');
      if(!password) console.error('Please enter a password');
    }
  }

  /**
   * Routes user to Recovery page to recover password
   */
  OnForgotPasswordClick(){
    this.router.navigate(['recovery'])
  }

  /**
   * Checks if the form is empty
   */
  IsFormEmpty(){
    if((this.loginForm.controls.email.invalid) || (this.loginForm.controls.password.invalid)) {
      this.emptyForm = true;
    }else {this.emptyForm = false;}
  }
}
