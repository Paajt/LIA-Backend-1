import express, { Request, Response } from 'express';
import { fetchJoke } from './jokesApi.js';
import { config } from './config.js';
import { verifyToken } from './auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/status', (req: Request, res: Response) => {
	res.json({ status: 'OK' });
});

app.get('/raw-response', async (req: Request, res: Response) => {
	try {
		const joke = await fetchJoke('Any');
		res.json(joke);
	} catch (error) {
		res.status(500).json({
			error: 'Failed to fetch joke from JokesAPI',
		});
	}
});

app.get('/api/jokes', verifyToken, async (req: Request, res: Response) => {
	try {
		const joke = await fetchJoke('Any');
		res.json({
			message: 'Random joke from all categories',
			category: joke.category,
			type: joke.type,
			content:
				joke.type === 'single'
					? joke.joke
					: { setup: joke.setup, delivery: joke.delivery },
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to fetch joke from JokesAPI',
		});
	}
});

app.get(
	'/api/jokes/:category',
	verifyToken,
	async (req: Request, res: Response) => {
		try {
			const { category } = req.params;
			const joke = await fetchJoke(category as string);
			res.json({
				message: `Joke from ${category} category`,
				category: joke.category,
				type: joke.type,
				content:
					joke.type === 'single'
						? joke.joke
						: { setup: joke.setup, delivery: joke.delivery },
			});
		} catch (error) {
			res.status(500).json({
				error: 'Failed to fetch joke from JokesAPI',
			});
		}
	}
);

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`);
	console.log(
		`Visit test.html here: http://localhost:${config.port}/test.html`
	);
});
