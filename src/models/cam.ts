import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Cam {
  _id?: string;
  name: string;
  label: string;
  internalIp: string;
  externalIp?: string;
  court: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    label: { type: String },
    internalIp: { type: String, required: true },
    externalIp: { type: String },
    court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
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

interface CamModel extends Omit<Cam, '_id'>, Document {}
export const Cam: Model<CamModel> = mongoose.model('Cam', schema);
