import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPlanComponent } from './tax-plan.component';

describe('TaxPlanComponent', () => {
  let component: TaxPlanComponent;
  let fixture: ComponentFixture<TaxPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
