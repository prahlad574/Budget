export interface TaxPlanForFinancialYear {
  taxPlanForFinancialYearId: number;
  investmentName: string;
  investmentAmount: number;
  noOfMonths: number;
  section: string;
  investingIn: string;
  financialYear: string;
}

export interface TaxplanTransaction {
  taxPlanTransactionId: number;
  taxPlanForFinancialYearId: number;
  transactionAmount: number;
  transactionDate: Date;
}