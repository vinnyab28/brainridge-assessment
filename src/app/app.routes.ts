import { Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionLogsComponent } from './pages/transaction-logs/transaction-logs.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

export const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, title: "Dashboard",
  },
  { path: "create-account", component: CreateAccountComponent },
  { path: "transaction", component: TransactionComponent },
  { path: "transaction-logs/:id", component: TransactionLogsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  // { path: "**", pathMatch: "full" }
];
