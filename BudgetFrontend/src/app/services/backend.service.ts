import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaxPlanForFinancialYear, TaxplanTransaction } from '../models/taxPlan';

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

  getTaxPlanForFinancialYear(financialYear: string) {
    return this.http.get<TaxPlanForFinancialYear[]>(this.backendUrl + '/TaxPlanForFinancialYear/GetTaxPlanForFinancialYear/' + financialYear);
  }

  updateTaxPlan(taxplan: TaxPlanForFinancialYear) {
    return this.http.put(this.backendUrl + '/TaxPlanForFinancialYear/UpdateTaxPlanForFinancialYear', taxplan, { headers: this.header });
  } 

  deleteTaxPlan(taxPlanForFinancialYearId: number) {
    return this.http.delete(this.backendUrl + '/TaxPlanForFinancialYear/DeleteTaxPlanForFinancialYear/' + taxPlanForFinancialYearId);
  }

  addTaxPlanTransaction(taxPlanTransaction: { taxPlanForFinancialYearId: string, transactionAmount: number, transactionDate: Date }) {
    return this.http.post(this.backendUrl + '/TaxPlanTransaction/AddTaxPlanTransaction', taxPlanTransaction, { headers: this.header });
  }

  getTransactionsForTaxPlan(taxPlanForFinancialYearId: string) {
    return this.http.get<TaxplanTransaction[]>(this.backendUrl + '/TaxPlanTransaction/GetTransactionsForTaxPlan/' + taxPlanForFinancialYearId);
  }

  updateTaxPlanTransaction(taxPlanTransaction: TaxplanTransaction) {
    return this.http.put(this.backendUrl + '/TaxPlanTransaction/UpdateTaxPlanTransaction', taxPlanTransaction, { headers: this.header });
  }

  deleteTaxPlanTransaction(taxPlanTransactionId: number) {
    return this.http.delete(this.backendUrl + '/TaxPlanTransaction/DeleteTaxPlanTransaction/' + taxPlanTransactionId);
  } 
}
