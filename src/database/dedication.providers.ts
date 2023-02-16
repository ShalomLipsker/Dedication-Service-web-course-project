import { Connection } from 'mongoose';
import { DedicationSchema } from './schema/dedication.schema';
import { databaseConstants } from "./database.constant";

export const dedicationProviders = [
  {
    provide: databaseConstants.providers.dedication,
    useFactory: (connection: Connection) => connection.model('Dedication', DedicationSchema),
    inject: [databaseConstants.providers.database],
  },
];