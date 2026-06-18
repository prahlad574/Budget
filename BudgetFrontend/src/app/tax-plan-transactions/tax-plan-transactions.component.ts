import { Component, OnInit, Input } from '@angular/core';
import { TaxplanTransaction } from '../models/taxPlan';
import { BackendService } from '../services/backend.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AddTaxPlanTransactionDialogComponent } from '../add-tax-plan-transaction-dialog/add-tax-plan-transaction-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-tax-plan-transactions',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, DatePipe, MatDialogModule],
  templateUrl: './tax-plan-transactions.component.html',
  styleUrl: './tax-plan-transactions.component.css'
})
export class TaxPlanTransactionsComponent implements OnInit {
taxplanTransactions: TaxplanTransaction[] = [];
  @Input() taxPlanForFinancialYearId: string | undefined;
  constructor(private backendService: BackendService, private dialog: MatDialog,
    private signalRService: SignalRService
  ) {

  }

  ngOnInit() {
    this.loadTaxPlanTransactions();
    this.subscribeToTaxPlanTransactionChanges();
  }

  subscribeToTaxPlanTransactionChanges() {
    // Logic to subscribe to tax plan transaction changes goes here
    // For demonstration, let's log a message when there is a change in tax plan transactions
    console.log('Subscribed to tax plan transaction changes for tax plan:', this.taxPlanForFinancialYearId);
    this.signalRService.subscribeMessage('TaxPlanTransaction-' + this.taxPlanForFinancialYearId).subscribe((data: any) => {
      console.log('Received message for tax plan transaction:', data);
      this.processTaxPlanTransactionUpdate(data);
    });
  }

  processTaxPlanTransactionUpdate(data: any) {
    // Logic to process the tax plan transaction update goes here
    console.log('Processing tax plan transaction update:', data);
    switch (data.message) {
      case 'TaxPlanTransactionAdded':
        this.taxplanTransactions.push(data.data);
        break;
      case 'TaxPlanTransactionUpdated':
        const indexToUpdate = this.taxplanTransactions.findIndex(t => t.taxPlanTransactionId === data.taxPlanTransaction.taxPlanTransactionId);
        if (indexToUpdate !== -1) {
          this.taxplanTransactions[indexToUpdate] = data.taxPlanTransaction;
        }
        break;
      case 'TaxPlanTransactionDeleted':
        this.taxplanTransactions = this.taxplanTransactions.filter(t => t.taxPlanTransactionId !== data.taxPlanTransactionId);
        break;
    }
    this.taxplanTransactions = [...this.taxplanTransactions];
  }

  loadTaxPlanTransactions() {
    if(this.taxPlanForFinancialYearId) {
      this.backendService.getTransactionsForTaxPlan(this.taxPlanForFinancialYearId).subscribe({
        next: (transactions: TaxplanTransaction[]) => {
          this.taxplanTransactions = transactions;
        },
        error: (error) => {
          console.error('Error fetching tax plan transactions', error);
        }
      });
    }
  }
  openAddTaxPlanTransactionDialog(taxplanTransaction?: TaxplanTransaction, index?: number) {
    // Logic to open the tax plan transaction details in a dialog goes here
    this.dialog.open(AddTaxPlanTransactionDialogComponent, {
          width: '600px',
          data: { taxplanTransaction, taxPlanForFinancialYearId: this.taxPlanForFinancialYearId, index }
        });
  }

  deletePlanTransaction(taxPlanTransactionId: number) {
    // Logic to delete a tax plan transaction goes here
    console.log('Tax plan transaction deleted with ID:', taxPlanTransactionId);
  }

  ngOnDestroy() {
    console.log('Unsubscribing from ' + 'TaxPlanTransaction-' + this.taxPlanForFinancialYearId);
    this.signalRService.hubConnection.off('TaxPlanTransaction-' + this.taxPlanForFinancialYearId);
  }
}
