import { model, Schema, Model } from 'mongoose';
import { IUser } from '../models';

const UserSchema: Schema = new Schema(
	{
		address: { type: String },
		birthday: { type: Date },
		confirmationCode: { type: String, unique: true },
		cpf: { type: String, unique: true },
		createDate: { type: Date, default: Date.now() },
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
		},
		gender: { type: String, uppercase: true, enum: ['M', 'F', 'O'] },
		name: { type: String },
		password: { type: String, required: true, min: 8 },
		phone: { type: String },
		rg: { type: String, unique: true },
		status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
		username: { type: String, unique: true, required: true },
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id, delete ret.password, delete ret.confirmationCode;
			},
		},
	}
);

const User: Model<IUser> = model('User', UserSchema);

export default User;
