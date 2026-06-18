import { Routes } from '@angular/router';
import { TaxPlanComponent } from './tax-plan/tax-plan.component';
import { TaxPlanTransactionsComponent } from './tax-plan-transactions/tax-plan-transactions.component';

export const routes: Routes = [
    {path: 'tax-plan', component: TaxPlanComponent},
    {path:'tax-plan-transactions/:taxPlanForFinancialYearId', component: TaxPlanTransactionsComponent},
];
