import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { BudgetDTO } from '../DTOs/BudgetDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrl: './budget-creation.component.css'
})

export class BudgetCreationComponent {
  constructor(private route: ActivatedRoute){}

  private userId: number | undefined;
  ngOnInit(): void {
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['id'])
    console.log(this.userId);
  }

  budgetForm = new FormGroup({
    accountID: new FormControl('', [Validators.required]),
    budgetAmount: new FormControl('', [Validators.required])
  })

  onSubmit(){
    let accountID = this.budgetForm.value.accountID;
    let budgetAmount = this.budgetForm.value.budgetAmount;

    console.log(`AccountID: ${accountID} BudgetAmount: $${budgetAmount}`)
  }
}
