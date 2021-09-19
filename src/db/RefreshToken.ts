import { model, Schema, Model } from 'mongoose';
import { IRefreshToken } from '../models';
import IpDataSchema from './IpData';

const RefreshTokenSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		token: { type: String },
		createdAt: { type: Date, default: Date.now() },
		expiredAt: { type: Date },
		revokedAt: { type: Date },
		createdByIp: IpDataSchema,
		revokedByIp: IpDataSchema,
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

RefreshTokenSchema.virtual('isExpired').get(function (this: IRefreshToken) {
	return new Date() >= this.expiredAt;
});

RefreshTokenSchema.virtual('isActive').get(function (this: IRefreshToken) {
	return !this.revokedAt && !this.isExpired;
});

RefreshTokenSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
});

const RefreshToken: Model<IRefreshToken> = model('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
