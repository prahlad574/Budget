import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxPlanTransactionDialogComponent } from './add-tax-plan-transaction-dialog.component';

describe('AddTaxPlanTransactionDialogComponent', () => {
  let component: AddTaxPlanTransactionDialogComponent;
  let fixture: ComponentFixture<AddTaxPlanTransactionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaxPlanTransactionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxPlanTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
