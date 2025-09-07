import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly backendUrl = "https://localhost:44345"; 
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getFinacialYears() {
    return this.http.get(this.backendUrl + '/GetFinancialYears');
  }
  getMonths() {
    return this.http.get(this.backendUrl + '/GetMonths');
  }
}
