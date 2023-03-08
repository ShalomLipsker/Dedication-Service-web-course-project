import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { databaseConstants } from '../database/database.constant';
import { Dedication } from '../database/interfaces/dedication.interface';
import {
  CreateDedicationDto,
  PlainHebDateDto,
} from './dto/create-dedication.dto';
import { UpdateDedicationDto } from './dto/update-dedication.dto';

@Injectable()
export class DedicationService {
  constructor(
    @Inject(databaseConstants.providers.dedication)
    private dedicationModel: Model<Dedication>,
  ) {}

  create(createDedicationDto: CreateDedicationDto) {
    const createdDedication = new this.dedicationModel(createDedicationDto);
    return createdDedication.save();
  }

  findAll() {
    return this.dedicationModel.find().exec();
  }

  findOne(id: string) {
    return this.dedicationModel.findById(id).exec();
  }

  findByHebDate(hebDate: Partial<PlainHebDateDto>) {
    return this.dedicationModel
      .find({
        'date.day': hebDate.day,
        'date.month': hebDate.month,
        expiredAt: { $gte: new Date() },
      })
      .exec();
  }

  update(id: string, updateDedicationDto: UpdateDedicationDto) {
    return this.dedicationModel
      .updateOne({ _id: id }, updateDedicationDto)
      .exec();
  }

  remove(id: string) {
    return this.dedicationModel.deleteOne({ _id: id }).exec();
  }
}
