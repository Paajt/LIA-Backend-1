import { api } from 'encore.dev/api';

export const generateToken = api(
	{
		method: 'POST',
		path: '/gentoken',
		expose: true,
		auth: false,
	},
	async (): Promise<{ token: string; expiresIn: string }> => {
		const { generateToken: genToken } = await import('../auth/auth');

		const token = genToken('testuser', 'joker');

		return { token, expiresIn: '24h' };
	}
);
