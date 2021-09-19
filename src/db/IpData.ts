import { Schema } from 'mongoose';

const IpDataSchema: Schema = new Schema(
	{
		ip: { type: String },
		countryName: { type: String },
		countryCode: { type: String },
		countryFlag: { type: String },
		regionName: { type: String },
		regionCode: { type: String },
		city: { type: String },
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc, ret) => {
				delete ret._id;
				delete ret.id;
			},
		},
	}
);

export default IpDataSchema;
