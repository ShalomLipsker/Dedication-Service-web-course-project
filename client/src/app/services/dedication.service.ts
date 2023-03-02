import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Dedication } from '../models/dedication.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DedicationService {
  private _$allDedications: BehaviorSubject<Dedication[]>;
  $allDedications: Observable<Dedication[]>;

  dedicationsFetched: boolean = false;

  constructor(public apiService: ApiService) {
    this._$allDedications = new BehaviorSubject<Dedication[]>([]);
    this.$allDedications = this._$allDedications.asObservable();

    this.apiService.allDedication().subscribe(
      (d) => {
        this._$allDedications.next(d);
        this.dedicationsFetched = true;
      },
      (err) => console.log(err),
    );
  }

  private _removeDedication(dedicationId: string) {
    this._$allDedications.next(
      this._$allDedications.value.filter((d) => d._id != dedicationId),
    );
  }

  private _addDedication(dedication: Dedication) {
    const d = this._$allDedications.value;
    d.push(dedication);
    this._$allDedications.next(d);
  }

  private _updateDedication(dedication: Dedication) {
    const d = this._$allDedications.value;
    this._$allDedications.next(
      d.map((d) => (d._id == dedication._id ? dedication : d)),
    );
  }

  dedicationById(dedicationId: string) {
    return this._$allDedications.value.find((d) => d._id == dedicationId);
  }

  createDedication = (dedication: Dedication) => {
    const obs = this.apiService.createDedication(dedication).pipe(share());
    obs.subscribe((res) => this._addDedication(res));
    return obs;
  };

  deleteDedication = (dedicationId: string) => {
    const obs = this.apiService.deleteDedication(dedicationId).pipe(share());
    obs.subscribe((res) => this._removeDedication(dedicationId));
    return obs;
  };

  updateDedication = (dedication: Dedication) => {
    const obs = this.apiService.updateDedication(dedication).pipe(share());
    obs.subscribe((res) => this._updateDedication(dedication));
    return obs;
  };
}
