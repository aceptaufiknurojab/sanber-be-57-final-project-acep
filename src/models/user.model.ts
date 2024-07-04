import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
export { IUser };
