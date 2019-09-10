import { Document } from 'mongoose';

export interface TodoInterface extends Document {
  readonly id: string;
  readonly title: string;
  readonly isDone: boolean;
}
