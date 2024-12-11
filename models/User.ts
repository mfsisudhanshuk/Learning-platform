import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'instructor', 'admin'], default: 'user' },
  videoLinks: [{ title: String, url: String }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

