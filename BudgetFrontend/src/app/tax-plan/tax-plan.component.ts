import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaxPlanDialogComponent } from '../add-tax-plan-dialog/add-tax-plan-dialog.component';
import { AddTaxPlanTransactionDialogComponent } from '../add-tax-plan-transaction-dialog/add-tax-plan-transaction-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { SignalRService } from '../services/signal-r.service';
import { DataSourceService } from '../services/data-source.service';
import { TaxPlanForFinancialYear } from '../models/taxPlan';
import { EventQueueService } from '../services/event-queue.service';
import { AppEventType } from '../models/app.event.type';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-tax-plan',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatTableModule],
  templateUrl: './tax-plan.component.html',
  styleUrl: './tax-plan.component.css'
})
export class TaxPlanComponent {

  taxPlans: TaxPlanForFinancialYear[] = [];
  currentSignalRConnectionKey: string = '';

  constructor(public dialog: MatDialog,
    private signalRService: SignalRService,
    private dataSourceService: DataSourceService,
    private eventQueue: EventQueueService,
    private backendService: BackendService
  ) {
    if(this.dataSourceService.selectedFinancialYear !== ''){
      this.loadTaxPlansForSelectedFinancialYear();
      this.subscribeToTaxPlanUpdates();
    }
    this.subscribeToMetadataChanges();
    this.subscribeToFinancialYearChanges();

  }

  subscribeToMetadataChanges() {
    this.eventQueue.On(AppEventType.BasicMetaDataLoaded).subscribe(event => {
      if(this.dataSourceService.selectedFinancialYear !== ''){
        this.loadTaxPlansForSelectedFinancialYear();
        this.subscribeToTaxPlanUpdates();
      }
    });
  }

  loadTaxPlansForSelectedFinancialYear() {
    this.backendService.getTaxPlanForFinancialYear(this.dataSourceService.selectedFinancialYear).subscribe({
      next: (taxPlans: TaxPlanForFinancialYear[]) => {
        this.taxPlans = taxPlans;
      },
      error: (error) => {
        console.error('Error fetching tax plans for financial year', error);
      }
    });
  }
  openTaxPlanDialog(taxPlan?: TaxPlanForFinancialYear, index?: number) {
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
  
  subscribeToFinancialYearChanges() {
    this.eventQueue.On(AppEventType.FinancialYearChanged).subscribe(event => {
      this.loadTaxPlansForSelectedFinancialYear();
      this.subscribeToTaxPlanUpdates();
    });
  }

  subscribeToTaxPlanUpdates() {
    this.unsubscribeFromTaxPlanUpdates();
    this.currentSignalRConnectionKey = 'TaxPlan-'+this.dataSourceService.selectedFinancialYear;
    this.signalRService.subscribeMessage(this.currentSignalRConnectionKey).subscribe((data: any, ) => {
      this.processToTaxPlanUpdates(data);
    }); 
  }

  unsubscribeFromTaxPlanUpdates() {
    if(this.currentSignalRConnectionKey !== ''){
      console.log('Unsubscribing from ' + this.currentSignalRConnectionKey);
      this.signalRService.hubConnection.off(this.currentSignalRConnectionKey);
    }
  }

  deletePlan(taxPlanForFinancialYearId: number) {
    this.backendService.deleteTaxPlan(taxPlanForFinancialYearId).subscribe({
      next: () => {
        console.log('Tax plan deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting tax plan', error);
      }
    });
  }

  processToTaxPlanUpdates(data: any) {
    switch (data.message) {
      case 'TaxPlanAdded':
        this.taxPlans.push(data.data);
        break;
      case 'TaxPlanUpdated':
        const index = this.taxPlans.findIndex(tp => tp.taxPlanForFinancialYearId === data.data.taxPlanForFinancialYearId);
        if (index !== -1) {
          this.taxPlans[index] = data.data;
        }
        break;
      case 'TaxPlanDeleted':
        this.taxPlans = this.taxPlans.filter(tp => tp.taxPlanForFinancialYearId !== data.data);
        break;
    }
    this.taxPlans = [...this.taxPlans]; // Refresh the data source
  }

  ngOnDestroy() {
    this.unsubscribeFromTaxPlanUpdates();
    
  }
}
