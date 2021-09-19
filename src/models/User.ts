import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	nickname: string;
	rg: string;
	cpf: string;
	gender: string;
	birthday: Date;
	email: string;
	password: string;
	phone: string;
	address: string;
}
