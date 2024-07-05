import { Schema, model, Document, models } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    roles: string[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            default: ['user'],
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
export { IUser };
