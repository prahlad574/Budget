import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BackendService } from '../services/backend.service';
import { DataSourceService } from '../services/data-source.service';
import { TaxPlanForFinancialYear } from '../models/taxPlan';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-add-tax-plan-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, NgIf],
  templateUrl: './add-tax-plan-dialog.component.html',
  styleUrl: './add-tax-plan-dialog.component.css'
})
export class AddTaxPlanDialogComponent {
/**
 *
 */
  investmentName: string = '';
  investmentAmount: number | undefined;
  noOfMonths: number | undefined;
  section: string = '';
  investingIn: string = '';
  isEditMode: boolean = false;

  constructor(private backendService: BackendService,
    private datasourceService: DataSourceService,
    @Inject(MAT_DIALOG_DATA) public data: {taxPlan?: TaxPlanForFinancialYear, index?: number},
  ) {
    if(this.data?.taxPlan) {
      this.investmentName = this.data.taxPlan.investmentName;
      this.investmentAmount = this.data.taxPlan.investmentAmount;
      this.noOfMonths = this.data.taxPlan.noOfMonths;
      this.section = this.data.taxPlan.section;
      this.investingIn = this.data.taxPlan.investingIn;
      this.isEditMode = true;
    }
  }
  addTaxPlan() {
    // Logic to add a tax plan goes here
    this.backendService.addTaxPlan({ investmentName: this.investmentName, investmentAmount: this.investmentAmount, noOfMonths: this.noOfMonths, section: this.section, investingIn: this.investingIn, financialYear: this.datasourceService.selectedFinancialYear }).subscribe({
      next: (response) => {
        console.log('Tax plan added successfully', response);
        // You can also close the dialog here if needed
      },
      error: (error) => {
        console.error('Error adding tax plan', error);
      }
    });
  }
  updateTaxPlan() {
    // Logic to update a tax plan goes here
    // You can use this.data.index to identify which tax plan to update
    this.backendService.updateTaxPlan({ taxPlanForFinancialYearId: this.data.taxPlan?.taxPlanForFinancialYearId!, investmentName: this.investmentName, investmentAmount: this.investmentAmount ?? 0, noOfMonths: this.noOfMonths ?? 0, section: this.section, investingIn: this.investingIn, financialYear: this.datasourceService.selectedFinancialYear ?? 0 }).subscribe({
      next: (response) => {
        console.log('Tax plan updated successfully', response);
        // You can also close the dialog here if needed
      },
      error: (error) => {
        console.error('Error updating tax plan', error);
      }
    });
  }
}
