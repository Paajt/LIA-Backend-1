export const config = {
	jwtSecret:
		process.env.JWT_SECRET ||
		'my-super-secret-key-change-this-in-production',
	port: parseInt(process.env.PORT || '3000', 10),
};
