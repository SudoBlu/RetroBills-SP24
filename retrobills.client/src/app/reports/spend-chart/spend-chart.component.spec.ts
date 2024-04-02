import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendChartComponent } from './spend-chart.component';

describe('SpendChartComponent', () => {
  let component: SpendChartComponent;
  let fixture: ComponentFixture<SpendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpendChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
