import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPage1Component } from './signup.component';

describe('SignupPage1Component', () => {
  let component: SignupPage1Component;
  let fixture: ComponentFixture<SignupPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPage1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
