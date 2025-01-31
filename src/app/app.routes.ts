import { Routes } from '@angular/router';
import { userFormGuard } from './guards/user-form.guard';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TransactionLogsComponent } from './pages/transaction-logs/transaction-logs.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

export const routes: Routes = [
  { path: "homepage", component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent, title: "Dashboard" },
  { path: "create-account", component: CreateAccountComponent, canDeactivate: [userFormGuard] },
  { path: "transaction", component: TransactionComponent, canDeactivate: [userFormGuard] },
  { path: "transaction-logs/:id", component: TransactionLogsComponent },
  { path: "404", component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: "**", redirectTo: "404" }
];
