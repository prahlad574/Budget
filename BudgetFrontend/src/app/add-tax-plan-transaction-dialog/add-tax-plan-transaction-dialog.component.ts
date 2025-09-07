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
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-tax-plan-transaction-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-tax-plan-transaction-dialog.component.html',
  styleUrl: './add-tax-plan-transaction-dialog.component.css'
})
export class AddTaxPlanTransactionDialogComponent {
/**
 *
 */
constructor() {
  
}
  transactionAmount: number = 0;
  transactionDate: Date | undefined;
  addTaxPlanTransaction() {
    // Logic to add a tax plan transaction goes here
    console.log('Tax plan transaction added');
    console.log('Transaction Amount:', this.transactionAmount);
    console.log('Transaction Date:', this.transactionDate);
  }

}
