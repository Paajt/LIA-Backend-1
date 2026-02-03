import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/status', (req: Request, res: Response) => {
	res.json({ status: 'OK' });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
