import { Header, Gateway, APIError } from 'encore.dev/api';
import { authHandler } from 'encore.dev/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
	'my-super-duper-topsecret-key-please-change-me-in-production';

// AuthParams specifies the incoming request information
// the auth handler is interested in. In this case it only
// cares about requests that contain the `Authorization` header.
interface AuthParams {
	Authorization: Header<string>;
}

// The AuthData specifies the information about the authenticated user
// that the auth handler makes available.
interface AuthData {
	userID: string;
	role: string;
}

// The auth handler itself.
export const auth = authHandler<AuthParams, AuthData>(
	async (params): Promise<AuthData> => {
		// Get authorization header
		const authHeader = params.Authorization;
		if (!authHeader) {
			throw APIError.unauthenticated('No token provided!');
		}
		const token = authHeader.replace('Bearer ', '');

		try {
			// verify token
			const decoded = jwt.verify(token, JWT_SECRET) as any;

			// Return user data
			return {
				userID: decoded.user,
				role: decoded.role,
			};
		} catch (error) {
			throw new Error('Invalid or expired token');
		}
	}
);

// Define the API Gateway that will execute the auth handler:
export const gateway = new Gateway({
	authHandler: auth,
});

// Helper function to generate tokens
export function generateToken(user: string, role: string): string {
	return jwt.sign({ user, role }, JWT_SECRET, { expiresIn: '24h' });
}
