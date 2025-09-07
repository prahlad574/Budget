import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { forkJoin } from 'rxjs';
import { EventQueueService } from './event-queue.service';
import { FinancialYear } from '../models/financialYears';
import { AppEvent } from '../models/app.event';
import { AppEventType } from '../models/app.event.type';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  financialYears: FinancialYear[] = [];
  months: string[] = [];
  selectedFinancialYear: string = '';
  constructor(private backendService: BackendService,
    private eventQueueService: EventQueueService
  ) { }

  loadMetadata() {
    forkJoin([this.backendService.getFinacialYears(), this.backendService.getMonths()]).subscribe({
      next: ([financialYears, months]) => {
        console.log(financialYears);
        console.log(months);
        this.financialYears = financialYears as FinancialYear[];
        this.months = months as string[];
        this.eventQueueService.dispatch(new AppEvent(AppEventType.BasicMetaDataLoaded,''));
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  getMetaData() {
    return { financialYears: this.financialYears, months: this.months };
  }
}
