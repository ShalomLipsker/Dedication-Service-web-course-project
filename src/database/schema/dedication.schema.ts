import * as mongoose from 'mongoose';

export const PlainHebDateSchema = new mongoose.Schema({
  day: Number,
  month: Number,
  year: Number,
});

export const DedicationSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  date: PlainHebDateSchema,
  expiredAt: Date,
  description: String,
});
