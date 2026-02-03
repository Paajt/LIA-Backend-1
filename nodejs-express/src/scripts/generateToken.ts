import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const token = jwt.sign(
	{
		user: 'testuser',
		role: 'joker',
	},
	config.jwtSecret,
	{ expiresIn: '24h' }
);

console.log('JWT Token:');
console.log(token);
