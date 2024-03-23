import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/* @figmaId 113:5 */
@Component({
  selector: 'cl-signup-page-1',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupPage1Component {
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  invalidRegister: boolean = false; //flag for invalid form

  registrationForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
  })

  /**
   * On submition of the register form, form values are validated and the user
   * is registered with the UserService. If the form is incorrect, an error is thrown
   */
  OnSubmit(){
    //get values from form
    const username = this.registrationForm.value.Username;
    const firstName = this.registrationForm.value.FirstName;
    const lastName = this.registrationForm.value.LastName;
    const email = this.registrationForm.value.Email;
    const password = this.registrationForm.value.Password;
    const address = this.registrationForm.value.Address;

    //if the form is valid
    if(this.registrationForm.valid){
      this.invalidRegister = false;
      //create the user
      this.userService.CreateUser(username!, firstName!, lastName!, password!, address!, email!).subscribe(id => {
        if (id) {
          //log the user in
          this.authService.loginUser();

          //route to their dashboard
          this.router.navigate(['dashboard', id])
        }else{
          //throw error
          console.error('Error creating user')
        }
      })
    }else{
      //error for if the form is incomplete
      this.invalidRegister = true;
      console.error('Please fill out all fields')
    }
  }
}
