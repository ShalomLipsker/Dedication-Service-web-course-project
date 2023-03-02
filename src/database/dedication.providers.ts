import { Connection } from 'mongoose';
import { databaseConstants } from './database.constant';
import { DedicationSchema } from './schema/dedication.schema';

export const dedicationProviders = [
  {
    provide: databaseConstants.providers.dedication,
    useFactory: (connection: Connection) =>
      connection.model('Dedication', DedicationSchema),
    inject: [databaseConstants.providers.database],
  },
];
