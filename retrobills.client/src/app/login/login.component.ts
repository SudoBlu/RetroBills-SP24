import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent{
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  invalidLogin: boolean = false; //flag to determine if valid email/password was given

  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  });

  /**
   * A user is retrieved from the data source and the password is checked. An error is thrown if either
   * the user can't be found or if the password does not match the one from teh data source
   */
  OnSubmit(){
    //get values from the form
    const email = this.loginForm.value.Email;
    const password = this.loginForm.value.Password;

    //if the email and password are not null...
    if(email && password){
      //get the user from the service
      this.userService.GetUserByEmail(email).subscribe(user => {
        console.log(user);
        if(!user){
          this.invalidLogin = true;
          throw new Error('A user could not be found')
        }

        //if the paswword does not match, throw an error
        if(user.Password !== password) {
          this.invalidLogin = true;
          throw new Error('Invalid password');
        }

        this.authService.loginUser();
        //navigate to the user's dashboard
        this.router.navigate(['/dashboard', user.UserId])
      })
    }
    if(!email) console.error('Please enter an email')

    if(!password) console.error('Please enter a password')

    if(this.loginForm.invalid) console.log('This form is invalid')
  }

  OnForgotPasswordClick(){
    this.router.navigate(['recovery'])
  }
}
