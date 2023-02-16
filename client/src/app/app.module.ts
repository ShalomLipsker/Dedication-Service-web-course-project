import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DedicationCardComponent } from './components/dedication-card/dedication-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DedicationListComponent } from './components/dedication-list/dedication-list.component';
import { ApiService } from './services/api.service';
import { DedicationFormComponent } from './components/dedication-form/dedication-form.component';
import { AuthGuard } from './services/auth.guard';
import { OnlyActiveDedicationsPipe } from './pipes/only-repeat-dedications.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CookieModule } from 'ngx-cookie';

import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DedicationCardComponent,
    DedicationListComponent,
    DedicationFormComponent,
    OnlyActiveDedicationsPipe,
    ImageCropperComponent,
    LoginComponent
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
    MatSelectModule
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
