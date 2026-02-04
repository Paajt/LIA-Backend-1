import { api } from 'encore.dev/api';

type JokeApiResponse =
	| {
			type: 'single';
			joke: string;
	  }
	| {
			type: 'twopart';
			setup: string;
			delivery: string;
	  };

type JokeResponse = {
	joke: string[];
};

export const joke = api(
	{ method: 'GET', path: '/jokes', expose: true, auth: true },
	async (): Promise<JokeResponse> => {
		const response = await fetch('https://v2.jokeapi.dev/joke/any');

		if (!response.ok) {
			throw new Error('Failed to fetch joke!');
		}

		const data = (await response.json()) as JokeApiResponse;

		if (data.type === 'single') {
			return { joke: [data.joke] };
		}

		return { joke: [data.setup, data.delivery] };
	}
);
