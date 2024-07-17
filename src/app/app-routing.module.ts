import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { RosterComponent } from './pages/attendance/roster/roster.component';
import { HumanresourceComponent } from './pages/humanresource/humanresource.component';
import { InviteemployeeComponent } from './pages/inviteemployee/inviteemployee.component';
import { WorklocationComponent } from './pages/attendance/worklocation/worklocation.component';
import { BasicsalaryComponent } from './pages/payroll/basicsalary/basicsalary.component';
import { SalarycomponentComponent } from './pages/payroll/salarycomponent/salarycomponent.component';
import { InsurancecomponentComponent } from './pages/payroll/insurancecomponent/insurancecomponent.component';
import { DisbursementComponent } from './pages/payroll/disbursement/disbursement.component';
import { SeveranceComponent } from './pages/payroll/severance/severance.component';
import { PivotComponent } from './pages/pivot/pivot.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'humanresource',
    component: HumanresourceComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'inviteemployee',
    component: InviteemployeeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'humanresource',
    component: HumanresourceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'roster',
    component: RosterComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'worklocation',
    component: WorklocationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'basicsallary',
    component: BasicsalaryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'salarycomponent',
    component: SalarycomponentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'insurancecomponent',
    component: InsurancecomponentComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'disbursement',
    component: DisbursementComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'saverance',
    component: SeveranceComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pivot',
    component: PivotComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
  ]
})
export class AppRoutingModule {
 }
