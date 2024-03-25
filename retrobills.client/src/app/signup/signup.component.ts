import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { map, switchMap, tap } from 'rxjs';
import { UserDTO } from '../DTOs/UserDTO';

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
    UserName: new FormControl('', [Validators.required]),
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
  async OnSubmit(){
    //get values from form
    const username = this.registrationForm.value.UserName;
    const firstName = this.registrationForm.value.FirstName;
    const lastName = this.registrationForm.value.LastName;
    const email = this.registrationForm.value.Email;
    const password = this.registrationForm.value.Password;
    const address = this.registrationForm.value.Address;

    //if the form is valid
    if(this.registrationForm.valid){
      this.invalidRegister = false;
      //create the user
      const UserDTO: UserDTO = {
        UserName: username!,
        password: password!,
        email: email!,
        FirstName: firstName!,
        LastName: lastName!,
        Address: address!
      }
      console.log(UserDTO);
      try{
        console.log(UserDTO);
        //Create the user
        this.userService.CreateUser(UserDTO).subscribe(
          () => {
            //Get the latest user
            this.userService.GetLatestUser().subscribe(
              response => {
                console.log(response);
                const userId = response.userId; //find user Id
                console.log(userId);
                if(userId){
                  //log user in
                  this.authService.loginUser();
                  this.router.navigate(['dashboard', userId])
                }
              },
              error => {console.error('Error occured while fetching the latest user: ', error);}
            );
          },
          error => {
            console.error('Error occured while creating the user: ', error)
          }
        )
      }catch(error){
        console.error('Error occured', error)
      }
    }else{
      //error for if the form is incomplete
      this.invalidRegister = true;
      console.error('Please fill out all fields')
    }
  }
}
