import { Schema, model, Document } from 'mongoose';

interface IUserTemp extends Document {
  email: string;
  password: string;
  token: string;
  expiration: Date;
}

const userTempSchema = new Schema<IUserTemp>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  expiration: { type: Date, required: true },
});

const UserTemp = model<IUserTemp>('UserTemp', userTempSchema);
export default UserTemp;
