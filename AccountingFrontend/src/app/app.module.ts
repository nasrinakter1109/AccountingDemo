import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user/user.component';
import { RolePermissionComponent } from './user/role-permission/role-permission.component';
import { AccountChartComponent } from './account-chart/account-chart/account-chart.component';
import { AddAccountChartComponent } from './account-chart/add-account-chart/add-account-chart.component';
import { AccountChartEditComponent } from './account-chart/account-chart-edit/account-chart-edit.component';
import { CustomerComponent } from './account-chart/customer/customer.component';
import { CustomerEditComponent } from './account-chart/customer-edit/customer-edit.component';
import { CustomerListComponent } from './account-chart/customer-list/customer-list.component';
import { BankListComponent } from './account-chart/bank-list/bank-list.component';
import { BankEditComponent } from './account-chart/bank-edit/bank-edit.component';
import { BankComponent } from './account-chart/bank/bank.component';
import { SupplierComponent } from './account-chart/supplier/supplier.component';
import { SupplierEditComponent } from './account-chart/supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './account-chart/supplier-list/supplier-list.component';
import { JournalComponent } from './journal/journal/journal.component';
import { JournalEditComponent } from './journal/journal-edit/journal-edit.component';
import { JournalListComponent } from './journal/journal-list/journal-list.component';
import { SalesInvoiceViewComponent } from './invoice/sales-invoice-view/sales-invoice-view.component';
import { SalesInvoiceEditComponent } from './invoice/sales-invoice-edit/sales-invoice-edit.component';
import { SalesInvoiceListComponent } from './invoice/sales-invoice-list/sales-invoice-list.component';
import { SalesInvoiceComponent } from './invoice/sales-invoice/sales-invoice.component';
import { FinancialReportComponent } from './accountReport/financial-report/financial-report.component';
import { JournalViewComponent } from './journal/journal-view/journal-view.component';
import { ModalComponent } from './Shared/modal/modal.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    FooterComponent,
    SidebarComponent,
    MainLayoutComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    UserComponent,
    RolePermissionComponent,
    AccountChartComponent,
    AddAccountChartComponent,
    AccountChartEditComponent,

    CustomerComponent,
    CustomerEditComponent,
    CustomerListComponent,
    BankListComponent,
    BankEditComponent,
    BankComponent,
    SupplierComponent,
    SupplierEditComponent,
    SupplierListComponent,
    JournalComponent,
    JournalEditComponent,
    JournalListComponent,
    JournalViewComponent,
    SalesInvoiceViewComponent,
    SalesInvoiceEditComponent,
    SalesInvoiceListComponent,
    SalesInvoiceComponent,
    FinancialReportComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
