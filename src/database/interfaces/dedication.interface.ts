import { Document } from 'mongoose';

export class PlainHebDate extends Document {
    day: number;
    month: number;
    year: number;
};

export interface Dedication extends Document {
    id: string;
    image: any;
    title: string;
    date: PlainHebDate;
    expiredAt: Date;
    description: string;
}