import mongoose from 'mongoose';
import User from './User';
import RefreshToken from './RefreshToken';

mongoose
	.connect(`${process.env.MONGODB_URL}`)
	.then(() => console.log('[Database]: 📖 Connection established'))
	.catch(error => {
		console.error(error);
		console.log(`[Database]: ❌ Connection Error`);
	});

mongoose.connection.on('disconnected', () => console.log('[Database]: 📘 Connection terminated'));
mongoose.connection.on('error', error => {
	console.error(error);
	console.log('[Database]: ❌ An error ocurred. Check output above for more details.');
});

process.on('SIGINT', async () => {
	await mongoose.connection.close();
	process.exit(0);
});

const isValidId = (id: IdType) => mongoose.Types.ObjectId.isValid(id);

export type IdType = string | number | mongoose.Types.ObjectId;

export default {
	User,
	RefreshToken,
	isValidId,
};
