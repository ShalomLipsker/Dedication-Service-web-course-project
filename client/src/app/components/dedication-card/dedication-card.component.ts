import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dedication } from 'src/app/models/dedication.interface';
import { DedicationService } from 'src/app/services/dedication.service';
import { isDedicationRepeat } from 'src/app/utils/dedication.utils';
import { renderPlainHebDate } from 'src/app/utils/hebrew-date.util';

@Component({
  selector: 'app-dedication-card',
  templateUrl: './dedication-card.component.html',
  styleUrls: ['./dedication-card.component.scss'],
})
export class DedicationCardComponent implements OnInit {
  @Input() dedication!: Dedication;

  readonly renderPlainHebDate = renderPlainHebDate;
  readonly isDedicationRepeat = isDedicationRepeat;

  constructor(
    private dedicationService: DedicationService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  editDedication() {
    this.router.navigate(['dedication', this.dedication._id]);
  }

  deleteDedication() {
    if (confirm('האם לאשר מחיקה?')) {
      this.dedicationService.deleteDedication(this.dedication._id).subscribe(
        (res) => {
          alert('נמחק בהצלחה');
        },
        (err) => {
          alert('אירעה בעיה, יש לנסות שוב');
        },
      );
    }
  }
}
