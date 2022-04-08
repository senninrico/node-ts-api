import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Recording {
  _id?: string;
  label: string;
  pid: string;
  startDate: Date;
  endDate?: Date;
  userId: string;
  court: string;
}

const schema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    pid: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
    replicated: { type: Boolean, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface RecordingModel extends Omit<Recording, '_id'>, Document {}
export const Recording: Model<RecordingModel> = mongoose.model(
  'Recording',
  schema
);
