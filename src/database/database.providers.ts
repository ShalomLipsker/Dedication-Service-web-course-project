import * as mongoose from 'mongoose';
import { databaseConstants } from './database.constant';

export const databaseProviders = [
  {
    provide: databaseConstants.providers.database,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
      }),
  },
];
