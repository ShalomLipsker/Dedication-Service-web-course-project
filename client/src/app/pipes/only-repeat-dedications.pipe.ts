import { Pipe, PipeTransform } from '@angular/core';
import { Dedication } from '../models/dedication.interface';
import { isDedicationActive } from '../utils/dedication.utils';

@Pipe({
  name: 'OnlyActiveDedications',
})
export class OnlyActiveDedicationsPipe implements PipeTransform {
  transform(
    dedications: Dedication[] | null,
    onlyRepeats: boolean,
  ): Dedication[] | null {
    if (!onlyRepeats || dedications == null) {
      return dedications;
    }
    return dedications.filter(isDedicationActive);
  }
}
