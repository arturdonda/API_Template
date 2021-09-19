import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../models';
import getStatusObjectFromDescription from '../utils/getStatusObjectFromDescription';

export default <T extends Object | null>(
	response: HttpResponse<T | null>,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const safeResponse: HttpResponse<T | null> = {
		status: getStatusObjectFromDescription(response?.status?.description ?? 'Internal Server Error'),
		message: response?.message || 'Something went wrong',
		result: response?.result ?? null,
	};

	console.log('req.ip: ', req.ip);
	console.log('req.socket.localAddress: ', req.socket.localAddress);
	console.log('req.socket.remoteAddress: ', req.socket.remoteAddress);

	return res.status(safeResponse.status.code).send(safeResponse);
};
