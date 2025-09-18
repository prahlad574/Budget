import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ToggleComponent } from './toggle/toggle.component';
import { DataSourceService } from './services/data-source.service';
import { EventQueueService } from './services/event-queue.service';
import { AppEventType } from './models/app.event.type';
import { SignalRService } from './services/signal-r.service';
import { sign } from 'crypto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, ToggleComponent, RouterLink, RouterLinkActive],
  providers: [DataSourceService, SignalRService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  selectedFinancialYear: string='';
  financialYears: string[] =[];
  selectedMonth = '';
  months: string[] =[];
  title = 'BudgetFrontend';

  @ViewChild('snav') sidenav!: MatSidenav;
  constructor(private dataSourceService: DataSourceService,
    private eventQueue: EventQueueService,
    private router: Router,
    private signalRService: SignalRService
  ) {
    this.router.events.subscribe((event: any) => {
      // sidenav close on same route navigation
      if (event instanceof NavigationEnd && this.router.url === event.url) {
        this.sidenav.close(); // Close the sidenav
      }
    });
   }
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.eventQueue.On(AppEventType.BasicMetaDataLoaded).subscribe(event => {
      this.getMetaData();
    })
    this.dataSourceService.loadMetadata();

  }
  getMetaData(){
    var metaData = this.dataSourceService.getMetaData();
    this.financialYears = metaData.financialYears.map(fy => fy.financialYearName);
    this.months = metaData.months;
    this.selectedFinancialYear = metaData.financialYears.filter(fy => fy.isCurrentFinancialYear === true).map(fy => fy.financialYearName)[0];
    this.selectedMonth = this.months[new Date().getMonth()-3];
  }
  
}
