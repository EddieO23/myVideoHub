import mongoose, {Schema} from 'mongoose';


const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  uploadCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;