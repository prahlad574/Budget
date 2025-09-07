import { Component } from '@angular/core';
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
@Component({
  selector: 'app-add-tax-plan-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
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

  constructor(private backendService: BackendService,
    private datasourceService: DataSourceService
  ) {
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
}
