import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEvent } from '../models/app.event';
import { AppEventType } from '../models/app.event.type';

@Injectable({
  providedIn: 'root'
})
export class EventQueueService {
  private eventBroker = new Subject<AppEvent<any>>()
  constructor() { }

  On(eventType: AppEventType): Observable<AppEvent<any>>{
    return this.eventBroker.pipe(filter(event => event.type === eventType));
  }
  dispatch<T>(event: AppEvent<T>): void {
    this.eventBroker.next(event);
  }
}
