import mongoose, { Document, Model, Schema } from 'mongoose';

export interface VideoSubscriber {
  _id?: string;
  user: string;
  video: string;
  subscribeDate: Date;
}

const schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    subscribeDate: { type: Date, required: true },
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

interface VideoSubscriberModel extends Omit<VideoSubscriber, '_id'>, Document {}
export const VideoSubscriber: Model<VideoSubscriberModel> = mongoose.model(
  'VideoSubscriber',
  schema
);
