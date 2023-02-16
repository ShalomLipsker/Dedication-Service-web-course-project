import { PlainHebDate } from "./PlainHebDate.interface";

export interface Dedication {
    _id: string;
    image: any;
    title: string;
    date: PlainHebDate;
    expiredAt: Date;
    description: string;
}