import { HttpStatus, HttpStatusDescription } from '../models';

export default (statusDescription: HttpStatusDescription): HttpStatus => {
	let status: HttpStatus;

	switch (statusDescription) {
		case 'OK':
			status = {
				code: 200,
				description: statusDescription,
				class: 'success',
			};
			break;

		case 'Created':
			status = {
				code: 201,
				description: statusDescription,
				class: 'success',
			};
			break;

		case 'No Content':
			status = {
				code: 204,
				description: statusDescription,
				class: 'success',
			};
			break;

		case 'Moved Permanently':
			status = {
				code: 301,
				description: statusDescription,
				class: 'redirect',
			};
			break;

		case 'Bad Request':
			status = {
				code: 400,
				description: statusDescription,
				class: 'error',
			};
			break;

		case 'Unauthorized':
			status = {
				code: 401,
				description: statusDescription,
				class: 'error',
			};
			break;

		case 'Forbidden':
			status = {
				code: 403,
				description: statusDescription,
				class: 'error',
			};
			break;

		case 'Not Found':
			status = {
				code: 404,
				description: statusDescription,
				class: 'error',
			};
			break;

		default:
		case 'Internal Server Error':
			status = {
				code: 500,
				description: statusDescription,
				class: 'error',
			};
			break;
	}

	return status;
};
