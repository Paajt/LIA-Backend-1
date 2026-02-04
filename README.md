# LIA-Backend-1

### Two API wrappers with JWT authentication for JokesAPI comparison:

1. Nodejs + Express
2. Encore.ts

### Prerequisites

-   Node.js 18+
-   npm
-   Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Paajt/LIA-Backend-1.git
cd LIA-Backend-1

# Install all dependencies (both projects)
npm run setup
```

## 1: Node.js + Express

Built with Node.js, Express, and TypeScript using ES6 modules.

### Testing with browser interface:

1. Navigate to Express project

```bash
cd nodejs-express
```

2. Generate JWT token

```bash
npm run generate-token
```

Copy generated token (example: eyJhbG...)

3. Start development server

```bash
npm run dev
```

4. Open browser test interface

```
http://localhost:3000/test.html
```

6. Try `Fetch Joke`-button (It should fail: Please enter a JWT token!)
7. Paste generated JWT token in `JWT Token field`
8. Press `Fetch Joke`-button.

### Success!

### Alternative: Testing with curl

**Generate token:**

```bash
npm run generate-token
```

**Test protected endpoint:**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/jokes
```

**Test by category (/Programming /Pun /Christmas):**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/jokes/Programming
```

### Available Endpoints

-   `GET /status` - Health check (no auth)
-   `GET /raw-response` - Raw JokesAPI response (no auth)
-   `GET /api/jokes` - Random joke (requires JWT)
-   `GET /api/jokes/:category` - Category-specific joke (requires JWT)

## 2: Encore.Ts

Built with Encore.ts framework

### Testing with Encore Dashboard

1. Navigate to Encore project

```bash
cd encoreTs/jokes-api
```

2. Start development server

```bash
encore run
```

3. Open Encore's development dashboard

```
http://localhost:9400
```

4. Generate JWT token via API
   In the dashboard:

-   Find **POST /gentoken** endpoint
-   Click **"Call API"**
-   Copy the returned token from response

5. Test authenticated endpoints

-   Find **GET /jokes** endpoint in dashboard (Ctrl+K)
-   In Authentication data paste your token: `"Bearer": "<PASTE YOUR TOKEN HERE>"`
-   Click **"Call API"**

### Success!

### Alternative: API Key Authentication

-   In Authentication data add:

```bash
"x-api-key": "secret-key-123"
```

-   Click **"Call API"**

### Success!

**Using API Key with curl (no token generation needed):**

```bash
curl -H "x-api-key: secret-key-123" http://localhost:4000/jokes
```

**Using JWT:**

```bash
# Generate token
curl -X POST http://localhost:4000/gentoken

# Use token
curl -H "Bearer: YOUR_TOKEN" http://localhost:4000/jokes
```

### Available Endpoints

-   `POST /gentoken` - Generate JWT token (no auth)
-   `GET /jokes` - Random joke (requires JWT or API Key)
-   `GET /jokes/:category` - Category-specific joke (requires JWT or API Key)
