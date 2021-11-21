import { model, Schema, Model } from 'mongoose';
import { IResetPasswordToken } from '../models';

const ResetPasswordTokenSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		token: { type: String, required: true },
		createdAt: { type: Date, default: Date.now() },
		expiredAt: { type: Date, required: true },
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id;
			},
		},
	}
);

ResetPasswordTokenSchema.virtual('isExpired').get(function (this: IResetPasswordToken) {
	return new Date() >= this.expiredAt;
});

ResetPasswordTokenSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
});

const ResetPasswordToken: Model<IResetPasswordToken> = model('ResetPasswordToken', ResetPasswordTokenSchema);

export default ResetPasswordToken;
