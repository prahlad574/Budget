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

  constructor() {
  }
  addTaxPlan() {
    // Logic to add a tax plan goes here
    console.log('Tax plan added');
  }
}
