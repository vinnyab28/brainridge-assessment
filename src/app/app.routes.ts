import { Routes } from '@angular/router';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionLogsComponent } from './pages/transaction-logs/transaction-logs.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, title: "Dashboard",
  },
  {
    path: "user-details/:id", component: UserDetailsComponent,
    children: [
      { path: "account-details", component: AccountDetailsComponent },
      { path: "transaction-logs", component: TransactionLogsComponent },
      { path: "", pathMatch: "full", redirectTo: "account-details" }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  // { path: "**", pathMatch: "full" }
];
