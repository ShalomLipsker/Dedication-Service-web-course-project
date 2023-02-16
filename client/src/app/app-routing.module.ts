import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DedicationFormComponent } from './components/dedication-form/dedication-form.component';
import { DedicationListComponent } from './components/dedication-list/dedication-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'dedication/:dedicationId', component: DedicationFormComponent, canActivate: [AuthGuard] },
  { path: 'dedication', component: DedicationListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'error', component: ErrorScreenComponent },
  { path: '**', redirectTo: 'dedication' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
