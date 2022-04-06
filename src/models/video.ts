import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Video {
  _id?: string;
  label: string;
  startDate: Date;
  endDate?: Date;
  recording: string;
  user: string;
  court: string;
  replicated: boolean;
}

const schema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    recording: {
      type: Schema.Types.ObjectId,
      ref: 'Recording',
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

interface VideoModel extends Omit<Video, '_id'>, Document {}
export const Video: Model<VideoModel> = mongoose.model('Video', schema);
