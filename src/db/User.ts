import { model, Schema, Model } from 'mongoose';
import { IUser } from '../models';
import { isEmailValid } from '../utils/validation';

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		nickname: { type: String, unique: true, required: true },
		rg: { type: String, unique: true, required: true },
		cpf: { type: String, unique: true, required: true },
		gender: { type: String, uppercase: true, enum: ['M', 'F', 'O'], required: true },
		birthday: { type: Date, required: true },
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
			validate: [isEmailValid, 'invalid e-mail'],
		},
		password: { type: String, required: true, min: 6 },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		createDate: { type: Date, default: Date.now() },
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id, delete ret.password;
			},
		},
	}
);

const User: Model<IUser> = model('User', UserSchema);

export default User;
