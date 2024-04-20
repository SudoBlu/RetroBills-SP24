import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePlanCreationComponent } from './budget-creation.component';

describe('BudgetCreationComponent', () => {
  let component: ExpensePlanCreationComponent;
  let fixture: ComponentFixture<ExpensePlanCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensePlanCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensePlanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
