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
  validChange: boolean = true;
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

            let newUserObject: UserDTO = {
              UserName: oldUserObject.UserName,
              password: this.recoveryForm.value.newPassword!,
              email: oldUserObject.email,
              FirstName: oldUserObject.FirstName,
              LastName: oldUserObject.LastName,
              Address: oldUserObject.Address
            }

            this.userService.UpdateUser(newUserObject, oldUserObject.userId).subscribe(
              response => {
                if(response) this.router.navigate(['login'])
              }, error => {
                console.error('There was an error', error)
              })
          }else{
            console.log('No user found')
          }
        }
      )
      
    }
  }


  validateForm(){
    const email = this.recoveryForm.value.email;
    const newPass = this.recoveryForm.value.newPassword;
    const confPass = this.recoveryForm.value.confirmPassword;

    if(this.recoveryForm.valid && newPass == confPass){
      this.validChange = true;
    }else{
      this.validChange = false;
    }
  }

  getUserObject(email: string): Observable<User | undefined>{
    return this.userService.GetUserByEmail(email);
  }
}
