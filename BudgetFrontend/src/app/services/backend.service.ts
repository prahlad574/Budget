import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  readonly backendUrl = "https://localhost:7271"; 
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getFinacialYears() {
    return this.http.get(this.backendUrl + '/GetFinancialYears');
  }

  getMonths() {
    return this.http.get(this.backendUrl + '/GetMonths');
  }

  addTaxPlan(taxPlan: {investmentName: string, investmentAmount: number | undefined, noOfMonths: number | undefined, section: string, investingIn: string, financialYear: string}) {
    return this.http.post(this.backendUrl + '/TaxPlanForFinancialYear/AddTaxPlanForFinancialYear', taxPlan, { headers: this.header });
  }
}
