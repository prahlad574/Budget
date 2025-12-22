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
    private eventQueue: EventQueueService
  ) {
    this.subscribeToTaxPlanUpdates();
    this.subscribeToFinancialYearChanges();

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
  
  subscribeToFinancialYearChanges() {
    this.eventQueue.On(AppEventType.FinancialYearChanged).subscribe(event => {
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

  deletePlan(index: number) {
    this.taxPlans.splice(index, 1);
    this.taxPlans = [...this.taxPlans]; // Refresh the data source
  }

  processToTaxPlanUpdates(data: any) {
    switch (data.message) {
      case 'TaxPlanAdded':
        this.taxPlans.push(data.data);
        break;
      // case 'TaxPlanUpdated':
      //   const index = this.taxPlans.findIndex(tp => tp.id === data.data.id);
      //   if (index !== -1) {
      //     this.taxPlans[index] = data.data;
      //   }
      //   break;
      // case 'TaxPlanDeleted':
      //   this.taxPlans = this.taxPlans.filter(tp => tp.id !== data.data.id);
      //   break;
    }
    this.taxPlans = [...this.taxPlans]; // Refresh the data source
  }

  ngOnDestroy() {
    this.unsubscribeFromTaxPlanUpdates();
    
  }
}
