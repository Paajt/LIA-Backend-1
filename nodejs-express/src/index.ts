import express, { Request, Response } from 'express';
import { fetchJoke } from './jokesApi.js';

const app = express();
const PORT = 3000;

app.get('/status', (req: Request, res: Response) => {
	res.json({ status: 'OK' });
});

app.get('/api/jokes', async (req: Request, res: Response) => {
	try {
		const joke = await fetchJoke('Any');
		res.json(joke);
	} catch (error) {
		res.status(500).json({
			error: 'Failed to fetch joke from JokesAPI',
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
