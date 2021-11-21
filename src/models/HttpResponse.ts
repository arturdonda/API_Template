export type HttpStatusCode = 200 | 201 | 204 | 301 | 400 | 401 | 403 | 404 | 500;

export type HttpStatusDescription =
	| 'OK'
	| 'Created'
	| 'No Content'
	| 'Moved Permanently'
	| 'Bad Request'
	| 'Unauthorized'
	| 'Forbidden'
	| 'Not Found'
	| 'Internal Server Error';

export type HttpStatusClass = 'success' | 'redirect' | 'error';

export type HttpStatus = {
	code: HttpStatusCode;
	description: HttpStatusDescription;
	class: HttpStatusClass;
};

export type HttpResponse<T extends Object | null> = {
	status: HttpStatus;
	message: string;
	result: T;
};
