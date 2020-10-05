import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBugsComponent } from './components/admin-bugs/admin-bugs.component';
import { ApplicationComponent } from './components/application/application.component';
import { BugReportViewComponent } from './components/bug-report-view/bug-report-view.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewBugReportComponent } from './components/new-bug-report/new-bug-report.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component'
import { ProfileComponent } from './components/profile/profile.component';
import { SolutionApprovalComponent } from './components/solution-approval/solution-approval.component';
import { ViewBugsPageComponent } from './components/view-bugs-page/view-bugs-page.component'
import { LoginMatComponent } from './components/login-mat/login-mat.component';
import { MetricsPageComponent } from './components/metrics-page/metrics-page.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import {RequiresAuthenticationGuard} from "./services/requires-authentication.guard";

const routes: Routes = [
  { path: 'adminbugs', component: AdminBugsComponent, canActivate: [RequiresAuthenticationGuard]},
  { path: 'applications', component: ApplicationComponent, canActivate: [RequiresAuthenticationGuard] },
  { path: 'bugreport/:id', component: BugReportViewComponent, canActivate: [RequiresAuthenticationGuard] },
  { path: 'bugsolutionreview/:id', component: SolutionApprovalComponent, canActivate: [RequiresAuthenticationGuard]},
  { path: 'main', component: MainPageComponent, canActivate: [RequiresAuthenticationGuard] },
  { path: 'newbugreport', component: NewBugReportComponent, canActivate: [RequiresAuthenticationGuard] },
  { path: 'newpassword', component: UpdatePasswordComponent, canActivate: [RequiresAuthenticationGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [RequiresAuthenticationGuard]},
  { path: 'bugreportapprove/:id', component: BugReportViewComponent, canActivate: [RequiresAuthenticationGuard]},
  { path: 'bugs', component : ViewBugsPageComponent, canActivate: [RequiresAuthenticationGuard] },
  // { path: 'metrics', component: MetricsPageComponent, canActivate: [RequiresAuthenticationGuard]},
  { path: '', component: LoginMatComponent},
  { path: 'resetpassword', component: PasswordResetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
