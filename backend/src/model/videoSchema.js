import mongoose, { Schema } from 'mongoose';

const videoSchema = new Schema(
  {
    title: { type: String, default: 'default title', required: true },
    description: { type: String, default: 'default description' },
    key: { type: String, required: true },
    path: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPrivate: { type: Boolean, default: false },
    thumbNail: { type: String, default: 'https://placehold.co/600x400' },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);
export default Video;
// export default mongoose.model('Video', videoSchema);
