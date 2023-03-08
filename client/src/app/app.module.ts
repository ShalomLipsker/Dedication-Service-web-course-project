import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DedicationCardComponent } from './components/dedication-card/dedication-card.component';
import { DedicationFormComponent } from './components/dedication-form/dedication-form.component';
import { DedicationListComponent } from './components/dedication-list/dedication-list.component';

import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { LoginComponent } from './components/login/login.component';
import { FeaturesModule } from './features/features.module';
import { OnlyActiveDedicationsPipe } from './pipes/only-repeat-dedications.pipe';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DedicationCardComponent,
    DedicationListComponent,
    DedicationFormComponent,
    OnlyActiveDedicationsPipe,
    ImageCropperComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    CookieModule.forRoot({}),
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FeaturesModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatStepperModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    ApiService,
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
