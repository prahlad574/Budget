import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TaxplanTransaction } from '../models/taxPlan';
import { MatTableModule } from '@angular/material/table';
import { BackendService } from '../services/backend.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-tax-plan-transaction-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatFormFieldModule,
    MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatTableModule, MatDialogContent, NgIf],
  templateUrl: './add-tax-plan-transaction-dialog.component.html',
  styleUrl: './add-tax-plan-transaction-dialog.component.css'
})
export class AddTaxPlanTransactionDialogComponent implements OnInit {
  
  transactionAmount: number = 0;
  transactionDate: Date | undefined;
  isEditMode: boolean = false;

  constructor(
    private backendService: BackendService,
    @Inject(MAT_DIALOG_DATA) public data: {taxplanTransaction?: TaxplanTransaction, taxPlanForFinancialYearId: string, index?: number},
  ) {}

  ngOnInit() {
    if(this.data?.taxplanTransaction) {
      this.transactionAmount = this.data.taxplanTransaction.transactionAmount;
      this.transactionDate = new Date(this.data.taxplanTransaction.transactionDate);
      this.isEditMode = true;
    }
    
  }

  updateTaxPlanTransaction(){
    if(this.data?.taxplanTransaction) {
      const updatedTransaction: TaxplanTransaction = {
        taxPlanTransactionId: this.data.taxplanTransaction.taxPlanTransactionId,
        taxPlanForFinancialYearId: this.data.taxplanTransaction.taxPlanForFinancialYearId,
        transactionAmount: this.transactionAmount,
        transactionDate: this.transactionDate!
      };
      this.backendService.updateTaxPlanTransaction(updatedTransaction).subscribe({
        next: (response) => {
          console.log('Tax plan transaction updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating tax plan transaction', error);
        }
      });
    }
  }

  addTaxPlanTransaction() {
      this.backendService.addTaxPlanTransaction({ taxPlanForFinancialYearId: this.data.taxPlanForFinancialYearId, transactionAmount: this.transactionAmount, transactionDate: this.transactionDate! }).subscribe({
        next: (response) => {
          console.log('Tax plan transaction added successfully', response);
        },
        error: (error) => {
          console.error('Error adding tax plan transaction', error);
        }
      });
  }

  

}
