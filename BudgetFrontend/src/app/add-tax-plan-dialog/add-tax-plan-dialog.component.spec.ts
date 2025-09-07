import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxPlanDialogComponent } from './add-tax-plan-dialog.component';

describe('AddTaxPlanDialogComponent', () => {
  let component: AddTaxPlanDialogComponent;
  let fixture: ComponentFixture<AddTaxPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaxPlanDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
