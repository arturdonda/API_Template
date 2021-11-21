import { Document } from 'mongoose';
import { IdType } from '../db';
import { IIpData } from './IpData';

export interface IRefreshToken extends Document {
	user: IdType;
	token: string;
	createdAt: Date;
	expiredAt: Date;
	revokedAt: Date;
	createdByIp: IIpData;
	revokedByIp: IIpData;
	isExpired: boolean;
	isActive: boolean;
}
