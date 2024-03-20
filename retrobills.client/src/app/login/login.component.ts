import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent{
  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {}

  user$ = new Observable<User | void>;

  loginForm = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl('')
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
        //if the paswword does not match, throw an error
        if(user.Password !== password) throw new Error('Incorrect password!')

        //navigate to the user's dashboard
        this.router.navigate(['/dashboard'])
      })
    }
  }

  OnForgotPasswordClick(){
    this.router.navigate(['recovery'])
  }
}
