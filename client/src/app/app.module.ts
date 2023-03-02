import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
