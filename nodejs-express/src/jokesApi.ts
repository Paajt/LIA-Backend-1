// Interface to define joke object structure:
interface JokeResponse {
	category?: string;
	type?: string;
	joke?: string;
	setup?: string;
	delivery?: string;
}

export async function fetchJoke(
	category: string = 'Any',
	type?: string
): Promise<JokeResponse> {
	const url = type
		? `https://v2.jokeapi.dev/joke/${category}?type=${type}`
		: `https://v2.jokeapi.dev/joke/${category}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return await response.json();
}
