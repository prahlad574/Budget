import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaxPlanDialogComponent } from '../add-tax-plan-dialog/add-tax-plan-dialog.component';
import { AddTaxPlanTransactionDialogComponent } from '../add-tax-plan-transaction-dialog/add-tax-plan-transaction-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-tax-plan',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatTableModule],
  templateUrl: './tax-plan.component.html',
  styleUrl: './tax-plan.component.css'
})
export class TaxPlanComponent {
  taxPlans = [
    { investmentName: 'Investment A', investmentAmount: 1000, noOfMonths: 12, section: 'Section 80C', investingIn: 'Mutual Funds', financialYear: '2023-2024' },
    { investmentName: 'Investment B', investmentAmount: 2000, noOfMonths: 6, section: 'Section 80D', investingIn: 'Insurance', financialYear: '2023-2024' }
  ];
  constructor(public dialog: MatDialog ) {
    
    
  }
  openTaxPlanDialog(taxPlan?: any, index?: number) {
    this.dialog.open(AddTaxPlanDialogComponent, {
      width: '600px',
      data: { taxPlan, index }
    });
  }
  openAddTaxPlanTransactionDialog(taxPlan?: any, index?: number) {
    this.dialog.open(AddTaxPlanTransactionDialogComponent, {
      width: '600px',
      data: { taxPlan, index }
    });
  }

  deletePlan(index: number) {
    this.taxPlans.splice(index, 1);
    this.taxPlans = [...this.taxPlans]; // Refresh the data source
  }
}
