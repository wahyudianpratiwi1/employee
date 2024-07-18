import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { InviteemployeeComponent } from './pages/inviteemployee/inviteemployee.component';
import { HumanresourceComponent } from './pages/humanresource/humanresource.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { WorklocationComponent } from './pages/attendance/worklocation/worklocation.component';
import { RosterComponent } from './pages/attendance/roster/roster.component';
import { BasicsalaryComponent } from './pages/payroll/basicsalary/basicsalary.component';
import { SalarycomponentComponent } from './pages/payroll/salarycomponent/salarycomponent.component';
import { InsurancecomponentComponent } from './pages/payroll/insurancecomponent/insurancecomponent.component';
import { DisbursementComponent } from './pages/payroll/disbursement/disbursement.component';
import { SeveranceComponent } from './pages/payroll/severance/severance.component';
import { PivotComponent } from './pages/pivot/pivot.component';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxSelectBoxModule, DxTreeListModule } from 'devextreme-angular';
import { EmployeeService } from './shared/services/employee.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InviteemployeeComponent,
    HumanresourceComponent,
    SettingsComponent,
    WorklocationComponent,
    RosterComponent,
    BasicsalaryComponent,
    SalarycomponentComponent,
    InsurancecomponentComponent,
    DisbursementComponent,
    SeveranceComponent,
    PivotComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxTreeListModule,
    DxSelectBoxModule,
    DxDropDownBoxModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
