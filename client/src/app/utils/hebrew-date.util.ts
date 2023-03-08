import { HDate, Locale } from '@hebcal/core';
import { isAfter } from 'date-fns';
import { PlainHebDate } from '../models/PlainHebDate.interface';

export function renderPlainHebDate(date: PlainHebDate): string | null {
  if (!date || !date.day || !date.month || !date.year) return null;

  const hdate = new HDate(date.day, date.month, date.year);
  return Locale.hebrewStripNikkud(hdate.renderGematriya());
}

export function getGregDate(date: PlainHebDate): Date {
  return new HDate(date.day, date.month, date.year).greg();
}

export function getNextYortzite(date: PlainHebDate) {
  let currentYear: number = new HDate(new Date()).getFullYear();

  if (
    !isAfter(new HDate(date.day, date.month, currentYear).greg(), new Date())
  ) {
    currentYear++;
  }

  return new HDate(date.day, date.month, currentYear).greg();
}
