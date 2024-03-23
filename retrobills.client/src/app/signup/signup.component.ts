import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs';

/* @figmaId 113:5 */
@Component({
  selector: 'cl-signup-page-1',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupPage1Component {
  constructor(private router: Router, private userService: UserService) {}

  registrationForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
  })

  OnSubmit(){
    //get values from form
    const username = this.registrationForm.value.Username;
    const firstName = this.registrationForm.value.FirstName;
    const lastName = this.registrationForm.value.LastName;
    const email = this.registrationForm.value.Email;
    const password = this.registrationForm.value.Password;
    const address = this.registrationForm.value.Address;

    if(this.registrationForm.valid){
      this.userService.CreateUser(username!, firstName!, lastName!, password!, address!, email!).subscribe(response => {
        if (response) {
          this.router.navigate(['dashboard'])
        }else{
          console.error('Error creating user')
        }
      })
    }else{
      console.error('Please fill out all fields')
    }
  }
}
