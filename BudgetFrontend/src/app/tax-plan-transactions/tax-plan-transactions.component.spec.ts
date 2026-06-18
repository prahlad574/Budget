import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPlanTransactionsComponent } from './tax-plan-transactions.component';

describe('TaxPlanTransactionsComponent', () => {
  let component: TaxPlanTransactionsComponent;
  let fixture: ComponentFixture<TaxPlanTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxPlanTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxPlanTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
