import { Header, Gateway } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
	'my-super-duper-topsecret-key-please-change-me-in-production';

const VALID_API_KEYS = new Set([
	'secret-key-123',
	'demo-key-456',
	'test-key-789',
]);

interface AuthParams {
	Bearer?: Header<string>;
	'x-api-key'?: Header<string>;
}

interface AuthData {
	userID: string;
	role: string;
	authMethod: string;
}

export const auth = authHandler<AuthParams, AuthData>(
	async (params): Promise<AuthData> => {
		// Prova API Key först
		const apiKey = params['x-api-key'];
		if (apiKey && VALID_API_KEYS.has(apiKey)) {
			return {
				userID: 'api-user',
				role: 'api-key-user',
				authMethod: 'API Key',
			};
		}

		// Prova JWT
		const authHeader = params.Bearer;
		if (!authHeader) {
			throw new Error('No authentication provided');
		}

		const token = authHeader.replace('Bearer ', '');

		try {
			const decoded = jwt.verify(token, JWT_SECRET) as any;
			return {
				userID: decoded.user,
				role: decoded.role,
				authMethod: 'JWT',
			};
		} catch (error) {
			throw new Error('Invalid authentication');
		}
	}
);

export const gateway = new Gateway({
	authHandler: auth,
});

export function generateToken(user: string, role: string): string {
	return jwt.sign({ user, role }, JWT_SECRET, { expiresIn: '24h' });
}
