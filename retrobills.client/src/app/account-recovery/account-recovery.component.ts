import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../DTOs/UserDTO';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.component.html',
  styleUrls: ['./account-recovery.component.css', '../home/home.component.scss']
})
export class AccountRecoveryComponent {
  samePasswordError: boolean = false;
  differentPasswordError: boolean = false;
  emptyFieldsError: boolean = false;
  validChange: boolean = !this.samePasswordError && !this.differentPasswordError && !this.emptyFieldsError;
  
  constructor(private userService: UserService, private router: Router){}

  recoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  onSubmit(){
    this.validateForm();

    if(this.validChange){
      const email = this.recoveryForm.value.email!;
      let oldUserObject: User;
      this.getUserObject(email).subscribe(
        (user: User | undefined) => {
          if(user){
            console.log(user)
            oldUserObject = user;

            if(oldUserObject.password === this.recoveryForm.value.newPassword){
              this.samePasswordError = true;
            }
            else{
              this.samePasswordError = false;
              let newUserObject: UserDTO = {
                UserName: oldUserObject.UserName,
                password: this.recoveryForm.value.newPassword!,
                email: oldUserObject.email,
                FirstName: oldUserObject.FirstName,
                LastName: oldUserObject.LastName,
                Address: oldUserObject.Address
              }
  
              console.log(oldUserObject);
              console.log(newUserObject);
  
              this.userService.UpdateUser(newUserObject, oldUserObject.userId).subscribe(() => {
                this.router.navigate(['login'])
              })
            }
          }else{
            console.log('No user found')
          }
        }
      )
      
    }
  }


  validateForm(){
    const newPass = this.recoveryForm.value.newPassword;
    const confPass = this.recoveryForm.value.confirmPassword;

    if(this.recoveryForm.valid && newPass == confPass){
      this.differentPasswordError = false;
      this.samePasswordError = false;
      this.emptyFieldsError = false;
    }else if(newPass !== confPass){
      this.emptyFieldsError = false;
      this.samePasswordError = false;
      this.differentPasswordError = true;
    }else{
      this.emptyFieldsError = true;
      this.samePasswordError = false;
      this.differentPasswordError = false;
    }
    console.log(this.differentPasswordError, this.samePasswordError, this.emptyFieldsError)
    this.validChange = !this.samePasswordError && !this.differentPasswordError && !this.emptyFieldsError;
    console.log(this.validChange);
  }

  getUserObject(email: string): Observable<User | undefined>{
    return this.userService.GetUserByEmail(email);
  }
}
