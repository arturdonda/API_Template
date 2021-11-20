import { Document } from 'mongoose';
import { IdType } from '../db';

export interface IResetPasswordToken extends Document {
	user: IdType;
	token: string;
	createdAt: Date;
	expiredAt: Date;
	isExpired: boolean;
}
