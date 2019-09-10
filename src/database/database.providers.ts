import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://backendtypescript:pass1234@cluster0-1zqkk.mongodb.net/tododb?retryWrites=true&w=majority',
      ),
  },
];
