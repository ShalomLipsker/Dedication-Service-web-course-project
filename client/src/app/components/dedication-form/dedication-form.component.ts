import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays } from 'date-fns';
import { Observable } from 'rxjs';
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
export class DedicationFormComponent implements OnInit {
  dedicationForm: FormGroup;
  editMode: boolean = false;
  _id: string | undefined;

  get formDate() {
    return this.dedicationForm.controls.date as FormGroup;
  }

  get hebDateRendered() {
    return renderPlainHebDate({
      day: this.formDate.controls.day.value,
      month: this.formDate.controls.month.value,
      year: this.formDate.controls.year.value,
    });
  }

  constructor(
    private dedicatedService: DedicationService,
    public dialog: MatDialog,
    public router: Router,
    public acRoute: ActivatedRoute,
  ) {
    this.dedicationForm = new FormGroup({
      image: new FormControl('', [Validators.required]),
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9א-ת-'",. ]{2,}$/),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9א-ת-'",. ]{2,}$/),
      ]),
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
    });

    this.acRoute.params.subscribe((p) => {
      const dedication = this.dedicatedService.dedicationById(p.dedicationId);
      if (typeof dedication != 'undefined') {
        this.dedicationForm.setValue({
          title: dedication.title,
          date: {
            day: dedication.date.day,
            month: dedication.date.month,
            year: dedication.date.year,
          },
          image: dedication.image,
          description: dedication.description,
          isRepeated: isDedicationRepeat(dedication),
        });
        this.editMode = true;
        this._id = dedication._id;
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let apiReq: (dedication: Dedication) => Observable<Dedication>;

    if (!this.editMode) {
      apiReq = this.dedicatedService.createDedication;
    } else {
      apiReq = this.dedicatedService.updateDedication;
    }

    apiReq({
      _id: this._id ? this._id : undefined,
      ...this.dedicationForm.value,
      expiredAt: this.expiredAt(this.dedicationForm.value.isRepeated),
    }).subscribe(
      (res) => {
        alert('נשמר בהצלחה');
        this.router.navigate(['dedication']);
      },
      (err) => {
        alert('אירעה שגיאה, יש לנסות שוב');
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
      : addDays(getNextYortzite(this.formDate.value), 7);
  }

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
}
