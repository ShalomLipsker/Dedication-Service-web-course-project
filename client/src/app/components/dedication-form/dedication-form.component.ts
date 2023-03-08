import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays } from 'date-fns';
import { Observable } from 'rxjs';
import { skipWhile, switchMap } from 'rxjs/operators';
import { Dedication } from 'src/app/models/dedication.interface';
import { DedicationService } from 'src/app/services/dedication.service';
import { isDedicationRepeat } from 'src/app/utils/dedication.utils';
import {
  getNextYortzite,
  renderPlainHebDate,
} from 'src/app/utils/hebrew-date.util';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';

@Component({
  selector: 'app-dedication-form',
  templateUrl: './dedication-form.component.html',
  styleUrls: ['./dedication-form.component.scss'],
})
export class DedicationFormComponent {
  get dateDetailsForm() {
    return this.dedicationForm.controls.dateDetails as FormGroup;
  }

  get dateForm() {
    return this.dateDetailsForm.controls.date as FormGroup;
  }

  get deceasedDetailsForm() {
    return this.dedicationForm.controls.deceasedDetails as FormGroup;
  }

  get hebDateRendered() {
    return renderPlainHebDate({
      day: this.dateForm.controls.day.value,
      month: this.dateForm.controls.month.value,
      year: this.dateForm.controls.year.value,
    });
  }

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public acRoute: ActivatedRoute,
    private dedicatedService: DedicationService,
  ) {
    this.dedicationForm = new FormGroup({
      image: new FormControl('', [Validators.required]),
      deceasedDetails: new FormGroup({
        title: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9א-ת-'",. ]{2,}$/),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9א-ת-'",. ]{2,}$/),
        ]),
      }),
      dateDetails: new FormGroup({
        isRepeated: new FormControl(false),
        date: new FormGroup({
          day: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(30),
          ]),
          month: new FormControl('', [
            Validators.required,
            Validators.min(1),
            Validators.max(13),
          ]),
          year: new FormControl('', [
            Validators.required,
            Validators.min(5500),
            Validators.max(6000),
          ]),
        }),
      }),
    });

    this.acRoute.params
      .pipe(
        switchMap((params) =>
          this.dedicatedService.dedicationById(params.dedicationId),
        ),
        skipWhile((dedication) => !Boolean(dedication)),
      )
      .subscribe((dedication) => {
        this.dedicationForm.setValue({
          deceasedDetails: {
            title: dedication?.title,
            description: dedication?.description,
          },
          dateDetails: {
            date: {
              day: dedication?.date.day,
              month: dedication?.date.month,
              year: dedication?.date.year,
            },
            isRepeated: dedication && isDedicationRepeat(dedication),
          },
          image: dedication?.image,
        });

        this.editMode = true;
        this._id = dedication?._id;
      });
  }

  dedicationForm: FormGroup;
  editMode = false;
  _id: string | undefined;
  hebMonth: { id: number; displayName: string }[] = [
    { id: 7, displayName: 'תשרי' },
    { id: 8, displayName: 'חשון' },
    { id: 9, displayName: 'כסלו' },
    { id: 10, displayName: 'טבת' },
    { id: 11, displayName: 'שבט' },
    { id: 12, displayName: 'אדר' },
    { id: 13, displayName: 'אדר ב' },
    { id: 1, displayName: 'ניסן' },
    { id: 2, displayName: 'אייר' },
    { id: 3, displayName: 'סיון' },
    { id: 4, displayName: 'תמוז' },
    { id: 5, displayName: 'אב' },
    { id: 6, displayName: 'אלול' },
  ];

  onSubmit() {
    let apiReq: (dedication: Dedication) => Observable<Dedication>;

    if (!this.editMode) {
      apiReq = this.dedicatedService.createDedication;
    } else {
      apiReq = this.dedicatedService.updateDedication;
    }

    apiReq({
      _id: this._id ? this._id : undefined,
      ...this.dedicationForm.value.dateDetails,
      ...this.dedicationForm.value.deceasedDetails,
      image: this.dedicationForm.value.image,
      expiredAt: this.expiredAt(
        this.dedicationForm.value.dateDetails.isRepeated,
      ),
    }).subscribe(
      () => {
        this.snackBar.open('נשמר בהצלחה', '', {
          panelClass: 'form-success-snack',
          duration: 1000,
          verticalPosition: 'top',
        });

        this.router.navigate(['dedication']);
      },
      () => {
        this.snackBar.open('אירעה שגיאה, יש לנסות שוב', '', {
          panelClass: 'form-error-snack',
          duration: 1000,
          verticalPosition: 'top',
        });
      },
    );
  }

  fileChangeEvent(event: any) {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      width: '85%',
      maxWidth: '28em',
      data: { imageChangedEvent: event },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dedicationForm.controls.image.setValue(result);
    });
  }

  private expiredAt(isRepeated: boolean) {
    return isRepeated
      ? new Date('01/01/4000')
      : addDays(getNextYortzite(this.dateForm.value), 7);
  }
}
