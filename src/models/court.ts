import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Court {
  _id?: string;
  name: string;
  typeSport: string;
  userId: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    typeSport: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

interface CourtModel extends Omit<Court, '_id'>, Document {}
export const Court: Model<CourtModel> = mongoose.model('Court', schema);
