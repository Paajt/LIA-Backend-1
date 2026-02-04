import { api, HttpStatus } from 'encore.dev/api';

interface Response {
	status: HttpStatus;
	message: string;
}

export const get = api(
	{ expose: true, method: 'GET', path: '/status' },
	async (): Promise<Response> => {
		const msg = `OK! (${HttpStatus.OK})`;
		return { status: HttpStatus.OK, message: msg };
	}
);
