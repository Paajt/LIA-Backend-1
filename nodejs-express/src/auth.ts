import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

export function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	// Get authorization header
	const authHeader = req.headers.authorization;

	// Check if header exists
	if (!authHeader) {
		res.status(401).json({ error: 'No token provided' });
		return;
	}

	// Header should be "Bearer TOKEN"
	// Split ["Bearer", "TOKEN"]
	const parts = authHeader.split(' ');

	// Check format
	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		res.status(401).json({
			error: 'Invalid token format. Expected: Bearer <token>',
		});
		return;
	}

	// Extract token (second part)
	const token = parts[1];

	// Verify token against our secret key
	try {
		const decoded = jwt.verify(token as string, config.jwtSecret as string);
		// If we get here: Token is valid!

		// Save decoded data in request (can be used in routes)
		(req as any).user = decoded;

		// Continue to next middleware/route
		next();
	} catch (error) {
		// jwt.verify() throws error if token is invalid or expired
		res.status(403).json({ error: 'Invalid or expired token' });
		return;
	}
}
