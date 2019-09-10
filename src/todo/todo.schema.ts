import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isDone: { type: Boolean, required: true },
});
