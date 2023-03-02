import { isAfter } from 'date-fns';
import { Dedication } from '../models/dedication.interface';

export function isDedicationRepeat(dedication: Dedication): boolean {
  return isAfter(new Date(dedication.expiredAt), new Date('3000/01/01'));
}

export function isDedicationActive(dedication: Dedication): boolean {
  return (
    isDedicationRepeat(dedication) ||
    isAfter(new Date(dedication.expiredAt), new Date())
  );
}
