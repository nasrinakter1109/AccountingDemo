import { Routes } from '@angular/router';
import { UserComponent } from './user/user/user.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolePermissionComponent } from './user/role-permission/role-permission.component';
import { AccountChartComponent } from './account-chart/account-chart-list/account-chart.component';
import { AddAccountChartComponent } from './account-chart/add-account-chart/add-account-chart.component';
import { CustomerComponent } from './account-chart/customer/customer.component';
import { SupplierComponent } from './account-chart/supplier/supplier.component';
import { CustomerListComponent } from './account-chart/customer-list/customer-list.component';
import { SupplierListComponent } from './account-chart/supplier-list/supplier-list.component';
import { CustomerEditComponent } from './account-chart/customer-edit/customer-edit.component';
import { SupplierEditComponent } from './account-chart/supplier-edit/supplier-edit.component';
import { AccountChartEditComponent } from './account-chart/account-chart-edit/account-chart-edit.component';
import { BankComponent } from './account-chart/bank/bank.component';
import { BankListComponent } from './account-chart/bank-list/bank-list.component';
import { BankEditComponent } from './account-chart/bank-edit/bank-edit.component';
import { JournalComponent } from './journal/journal/journal.component';
import { JournalListComponent } from './journal/journal-list/journal-list.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalViewComponent } from './journal/journal-view/journal-view.component';
import { SalesInvoiceComponent } from './invoice/sales-invoice/sales-invoice.component';
import { SalesInvoiceListComponent } from './invoice/sales-invoice-list/sales-invoice-list.component';
import { SalesInvoiceEditComponent } from './invoice/sales-invoice-edit/sales-invoice-edit.component';
import { SalesInvoiceViewComponent } from './invoice/sales-invoice-view/sales-invoice-view.component';


export const routes: Routes = [
    {  path: '',
      component: MainLayoutComponent,
      children: [
        { path: '', component: DashboardComponent },
        { path: 'user', component: UserComponent },
        { path: 'role-permission', component: RolePermissionComponent },
        { path: 'account-list', component: AccountChartComponent },
        { path: 'add-account', component: AddAccountChartComponent },
        { path: 'account-edit/:id', component: AccountChartEditComponent },
        { path: 'customer', component: CustomerComponent },
        { path: 'supplier', component: SupplierComponent },
        { path: 'customer-list', component: CustomerListComponent },
        { path: 'supplier-list', component: SupplierListComponent },
        { path: 'customer-edit/:id', component: CustomerEditComponent },
        { path: 'supplier-edit/:id', component: SupplierEditComponent },
        { path: 'bank', component: BankComponent },
        { path: 'bank-list', component: BankListComponent },
        { path: 'bank-edit/:id', component: BankEditComponent },
        { path: 'journal', component: JournalComponent },
        { path: 'journal-list', component: JournalListComponent },
        { path: 'journal-edit/:id', component: JournalEditComponent },
        { path: 'journal/view/:id', component: JournalViewComponent },
        { path: 'salesInvoice', component: SalesInvoiceComponent },
        { path: 'salesInvoice-list', component: SalesInvoiceListComponent },
        { path: 'salesInvoice-edit/:id', component: SalesInvoiceEditComponent },
        { path: 'salesInvoice/view/:id', component: SalesInvoiceViewComponent },
      ]
    },
];
