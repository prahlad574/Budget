import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaxPlanDialogComponent } from '../add-tax-plan-dialog/add-tax-plan-dialog.component';
import { AddTaxPlanTransactionDialogComponent } from '../add-tax-plan-transaction-dialog/add-tax-plan-transaction-dialog.component';

@Component({
  selector: 'app-tax-plan',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './tax-plan.component.html',
  styleUrl: './tax-plan.component.css'
})
export class TaxPlanComponent {

constructor(public dialog: MatDialog ) {
  
  
}
openTaxPlanDialog() {
  this.dialog.open(AddTaxPlanDialogComponent, {
    width: '600px',
    data: {}
  });
}
openAddTaxPlanTransactionDialog() {
  this.dialog.open(AddTaxPlanTransactionDialogComponent, {
    width: '600px',
    data: {}
  }); 
}
}
