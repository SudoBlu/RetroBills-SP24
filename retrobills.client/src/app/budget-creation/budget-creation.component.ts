import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetsService } from '../services/budgets.service';
import { BudgetDTO } from '../DTOs/BudgetDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Account } from '../account';

@Component({
  selector: 'app-budget-creation',
  templateUrl: './budget-creation.component.html',
  styleUrl: './budget-creation.component.css'
})

export class ExpensePlanCreationComponent {
  constructor(private route: ActivatedRoute, private accountService: AccountService, private budgetService: BudgetsService, private router: Router){}

  private userId: number | undefined;
  public accounts: Account[] = [];
  public invalidCreate: boolean = false;
  private accountId = this.route.snapshot.params['accountId']

  ngOnInit(): void {
    console.log('Create budget form initialized')
    console.log(this.route.snapshot.params)
    this.userId = parseInt(this.route.snapshot.params['userId'])
    this.accountService.getAccountsForUser(this.userId).subscribe(response => {
      console.log(response);
      this.accounts = response;
      console.log(this.accounts);
    });
  }

  budgetForm = new FormGroup({
    accountID: new FormControl(0, [Validators.required]),
    budgetAmount: new FormControl(0, [Validators.required])
  })

  async onSubmit(){
      this.invalidCreate = false;
      console.log(this.accounts);
      let accountID = this.budgetForm.value.accountID;
      let budgetAmount = this.budgetForm.value.budgetAmount;

      if(this.checkFormValidity(accountID!, budgetAmount!)){
        this.invalidCreate = true;
        console.log(`AccountID: ${accountID} BudgetAmount: $${budgetAmount}`)
  
        const budgetDTO: BudgetDTO = {
          BudgetAmount: budgetAmount!
        }
    
        const budgetId = await this.checkForBudgets(accountID!);
    
        if(budgetId == 0){
          console.log(`Creating budget...`)
          this.budgetService.createBudget(accountID!, budgetDTO).subscribe(() => {
            this.router.navigate(['budget', this.userId, this.accountId])
          })
        }else{
          console.log(`Editing budget with ID: ${budgetId}`)
          this.budgetService.updateBudget(accountID!, budgetDTO).subscribe(() => {
            this.router.navigate(['expense', this.userId, this.accountId])
          })
        }
      }else{
        this.invalidCreate = false;
      }
    }

  checkForBudgets(accountID: number): Promise<number>{
    return new Promise<number>((resolve, reject) => {
      const subscription = this.budgetService.getBudget(accountID).subscribe(response => {
        console.log(response);
        console.log(response.budgetId)
        if(response.budgetId !== 0){
          resolve(response.budgetId);
          subscription.unsubscribe()
        }else{
          resolve(0)
          subscription.unsubscribe()
        }
      }, error => {
        reject(error)
        subscription.unsubscribe()
      });

      subscription.add(() => console.log('Subscription added'))
    })
  }

  checkFormValidity(accountId: number, budgetAmount: number){
    if(accountId === 0 || budgetAmount === 0){
      console.log('Form invalid')
      return false;
    }
    return true;
  }

  onCancelClick(){
    this.router.navigate(['expense', this.userId, this.accountId])
  }
}
