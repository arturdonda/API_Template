import { HttpResponse, HttpStatusDescription } from '../models';
import getStatusObjectFromDescription from './getStatusObjectFromDescription';

export default <T extends Object | null>(
	status: HttpStatusDescription,
	message: string,
	result: T | null
): HttpResponse<T | null> => ({
	status: getStatusObjectFromDescription(status),
	message: message,
	result: result,
});
