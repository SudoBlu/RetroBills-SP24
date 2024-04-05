import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { BudgetDTO } from '../DTOs/BudgetDTO';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../account';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrl: './budget-creation.component.css'
})

export class BudgetCreationComponent {
  constructor(private route: ActivatedRoute, private accountService: AccountService){}

  private userId: number | undefined;
  public accounts: Account[] = [];

  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['id'])
    this.accountService.getAccountsForUser(this.userId).subscribe(response => {
      console.log(response);
      this.accounts = response;
      console.log(this.accounts);
    });
  }

  budgetForm = new FormGroup({
    accountID: new FormControl(0, [Validators.required]),
    budgetAmount: new FormControl('', [Validators.required])
  })

  onSubmit(){
    console.log(this.accounts);
    let accountID = this.budgetForm.value.accountID;
    let budgetAmount = this.budgetForm.value.budgetAmount;

    console.log(`AccountID: ${accountID} BudgetAmount: $${budgetAmount}`)
  }
}
